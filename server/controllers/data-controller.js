const dataService = require("../service/data-service");

async function getRoles(req, res, next) {
  try {
    const roles = await dataService.getAllRoles();
    return res.json(roles);
  } catch (e) {
    next(e);
  }
}

async function getCities(req, res, next) {
  try {
    const cities = await dataService.getAllCities();
    return res.json(cities);
  } catch (e) {
    next(e);
  }
}

async function getTourCategories(req, res, next) {
  try {
    const tourCategories = await dataService.getAllCategories();
    return res.json(tourCategories);
  } catch (e) {
    next(e);
  }
}

// ********** Создание нового тура - получение данных с front и передача в данных в service ********** //
async function createNewTour(req, res, next) {
  try {
    const {
      title,
      content,
      schegule,
      category,
      price,
      duration,
      start_time,
      guide_id,
      amount,
      city,
    } = req.body;

    const imageFiles = req.files;

    const newTour = await dataService.postNewTour(
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
    );

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function getGuideCardById(req, res, next) {
  try {
    const { userId } = req.body;
    const guideCards = await dataService.getAllGuideCardsById(userId);
    return res.json(guideCards);
  } catch (e) {
    next(e);
  }
}

async function deleteGuideCardById(req, res, next) {
  try {
    const { id } = req.params;
    await dataService.deleteGuideCard(Number(id));
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

async function getIdGuideCard(req, res, next) {
  try {
    const { id } = req.params;
    const cardData = await dataService.getDataGuideCardById(id);

    res.json(cardData);
  } catch (e) {
    next(e);
  }
}

async function editGuideCardById(req, res, next) {
  try {
    const tourId = req.params.id;

    const {
      title,
      content,
      schegule,
      category,
      price,
      amount,
      duration,
      start_time,
      city,
    } = req.body;

    const imageFiles = req.files;
    const existingFileNames = JSON.parse(req.body.existingFileNames);
    const cityId = city;
    console.log("cityId", cityId);
    await dataService.editGuideCard(
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
    );
    res.status(200).json({ message: "Tour updated successfully" });
  } catch (e) {
    next(e);
  }
}

async function getDataCard(req, res, next) {
  try {
    const { id } = req.params;
    console.log("id", id);
    const cardData = await dataService.getDataCardById(id);

    res.json(cardData);
  } catch (e) {
    next(e);
  }
}

async function getPlaces(req, res, next) {
  try {
    const places = await dataService.getAllPlaces();
    return res.json(places);
  } catch (e) {
    next(e);
  }
}

// Создание нового кастомного тура
async function createNewCustomTour(req, res, next) {
  try {
    const { title, user_id, array_of_place_id } = req.body;

    await dataService.postNewCustomTour(title, user_id, array_of_place_id);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

// Получение информации о кастомном туре
async function getCustomTours(req, res, next) {
  try {
    const user_id = req.body.userId;
    const toursWithPlaces = await dataService.getAllCustomTours(user_id);
    console.log("в файле data-controller.js toursWithPlaces ", toursWithPlaces);
    console.log("toursWithPlaces[0].Places ", toursWithPlaces[0].Places);
    return res.json(toursWithPlaces);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getRoles,
  getCities,
  getTourCategories,
  createNewTour,
  getGuideCardById,
  deleteGuideCardById,
  editGuideCardById,
  getIdGuideCard,
  getDataCard,
  getPlaces,
  createNewCustomTour,
  getCustomTours,
};
