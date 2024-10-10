const path = require("path");
const fs = require("fs");

const {
  Role,
  City,
  Tour,
  Tour_category,
  Tour_image,
  Place,
  Custom_tour,
  Custom_tour_to_place,
  Favourite,
} = require("../db/models");

async function getAllRoles() {
  return await Role.findAll();
}

async function getAllCities() {
  return await City.findAll();
}

async function getAllCategories() {
  return await Tour_category.findAll();
}

async function getAllPlaces() {
  return await Place.findAll();
}

// ********** Создание нового тура в БД ********** //
async function postNewTour(
  title,
  content,
  schegule,
  category,
  imageFiles,
  price,
  duration,
  start_time,
  guide_id,
  amount,
  city
) {
  const tour = await Tour.create({
    title,
    content,
    schegule,
    category_id: category,
    cost: price,
    duration,
    start_time,
    guide_id,
    city_id: city,
    number_of_tour_participants: amount,
  });
  if (imageFiles) {
    const imagePromises = imageFiles?.map((file) =>
      Tour_image.create({
        image: file.filename,
        tour_id: tour.id,
      })
    );
    await Promise.all(imagePromises);
  }
}

async function getAllGuideCardsById(guide_id) {
  return await Tour.findAll({
    where: { guide_id },
    include: [
      {
        model: Tour_image,
        attributes: ["id", "image"],
      },
      {
        model: Tour_category,
        attributes: ["title"],
      },
      {
        model: City,
        attributes: ["title"],
      },
    ],
  });
}

async function deleteGuideCard(id) {
  await Tour_image.destroy({ where: { tour_id: id } });
  await Favourite.destroy({ where: { tour_id: id } });
  return await Tour.destroy({
    where: { id },
  });
}

async function getDataGuideCardById(id) {
  const tour = await Tour.findByPk(id, {
    include: [
      {
        model: Tour_image,
        attributes: ["id", "image"],
      },
      {
        model: Tour_category,
        attributes: ["title"],
      },
      {
        model: City,
        attributes: ["title"],
      },
    ],
  });

  return tour;
}

async function editGuideCard(
  cityId,
  tourId,
  title,
  content,
  schegule,
  category,
  price,
  amount,
  duration,
  start_time,

  imageFiles,
  existingFileNames
) {
  const tour = await Tour.findByPk(tourId);
  if (!tour) {
    throw new Error("Tour not found");
  }
  console.log("cityId", cityId);
  // Обновление данных тура
  tour.title = title;
  tour.content = content;
  tour.schegule = schegule;
  tour.category_id = category;
  tour.cost = price;
  tour.duration = duration;
  tour.start_time = start_time;
  tour.city_id = cityId;
  tour.number_of_tour_participants = amount;

  await tour.save();

  //! Получаем все изображения для данного тура из базы данных
  const existingImages = await Tour_image.findAll({
    where: { tour_id: tourId },
  });

  //console.log("existingImages", existingImages);

  //! Фильтруем изображения, чтобы оставить только те, что есть в existingFileNames
  const imagesToKeep = existingImages.filter((image) =>
    existingFileNames.includes(image.image)
  );

  //console.log("imagesToKeep", imagesToKeep);

  //! Определяем изображения, которые нужно удалить из базы данных
  const imagesToDelete = existingImages.filter(
    (image) => !imagesToKeep.includes(image.image)
  );

  //! Удаляем изображения, которые не входят в existingFileNames
  if (imagesToDelete.length > 0) {
    await Tour_image.destroy({
      where: {
        id: imagesToDelete?.map((image) => image.id),
      },
    });

    // imagesToDelete.forEach((image) => {
    //   const filePath = path.join(__dirname, "../public/uploads", image.image);
    //   fs.unlinkSync(filePath);
    // });
  }

  const updatedImages = imagesToKeep?.map((image) => ({
    id: image.id,
    image: image.image,
    tour_id: tourId,
  }));

  //! Добавляем новые файлы в базу данных
  if (imageFiles) {
    const newImages = imageFiles?.map((file) => ({
      image: file.filename,
      tour_id: tourId,
    }));

    await Tour_image.bulkCreate([...updatedImages, ...newImages]);
  }
}

async function getDataCardById(id) {
  const tour = await Tour.findByPk(id, {
    include: [
      {
        model: Tour_image,
        attributes: ["id", "image"],
      },
      {
        model: Tour_category,
        attributes: ["title"],
      },
    ],
  });

  return tour;
}

async function postNewCustomTour(title, user_id, array_of_place_id) {
  // делаем 1 запись в таблицу Custom_tour
  const newCustomTour = await Custom_tour.create({
    title,
    user_id,
  });

  // делаем несколько записей в таблицу Custom_tour_to_place по количеству айдишников достопримечательностей
  const promises = array_of_place_id?.map((place_id) => {
    return Custom_tour_to_place.create({
      custom_tour_id: newCustomTour.dataValues.id,
      place_id,
    });
  });

  // Ждем завершения всех промисов
  await Promise.all(promises);
}

async function getAllCustomTours(user_id) {
  return await Custom_tour.findAll({
    //findAll: Находит все кастомные туры для пользователя с user_id
    where: { user_id },
    include: [
      //include: Включает связанные модели, в данном случае Place.
      {
        model: Place,
        through: {
          //through: Включает атрибуты из связующей таблицы Custom_tour_to_place.
          attributes: ["custom_tour_id", "place_id"], // attributes: Указывает, какие именно атрибуты должны быть возвращены из связующей таблицы.
        },
        attributes: [
          "id",
          "title",
          "description",
          "address",
          "latitude",
          "longitude",
        ], // Указываем нужные атрибуты из таблицы Place
      },
    ],
    raw: false, // Оставляем `raw: false`, чтобы данные вернулись в виде объектов моделей
    nest: true, // Опция nest используется для корректного вложения ассоциаций
  });
  // try {
  //   const customTours = await Custom_tour.findAll({
  //     where: { user_id },
  //     include: [
  //       {
  //         model: Place,
  //         through: {
  //           attributes: [], // Если не нужны данные из связующей таблицы, оставляем пустым
  //         },
  //         attributes: ["id", "title", "description", "address"], // Указываем, какие атрибуты нужны
  //       },
  //     ],
  //     raw: false, // Оставляем raw: false для корректного отображения данных
  //     nest: true, // Включаем вложение данных для правильной структуры
  //   });

  //   // Преобразуем данные вручную, чтобы получить чистые объекты
  //   const result = customTours?.map((tour) => {
  //     return {
  //       id: tour.id,
  //       title: tour.title,
  //       user_id: tour.user_id,
  //       createdAt: tour.createdAt,
  //       updatedAt: tour.updatedAt,
  //       Places: tour.Places?.map((place) => ({
  //         id: place.id,
  //         title: place.title,
  //         description: place.description,
  //         address: place.address,
  //       })),
  //     };
  //   });

  //   return result;
  // } catch (error) {
  //   console.error("Error fetching custom tours with places:", error);
  //   throw error;
  // }
}

module.exports = {
  getAllRoles,
  getAllCities,
  getAllCategories,
  postNewTour,
  getAllGuideCardsById,
  deleteGuideCard,
  editGuideCard,
  getDataGuideCardById,
  getDataCardById,
  getAllPlaces,
  postNewCustomTour,
  getAllCustomTours,
};
