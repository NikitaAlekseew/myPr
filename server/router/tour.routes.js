const express = require("express");
const {
  Tour,
  Tour_category,
  Tour_image,
  Favourite,
  User,
} = require("../db/models");

const router = express.Router();

router.get("/tours", async (req, res) => {
  try {
    const allTours = await Tour.findAll({
      include: [
        {
          model: Tour_image,
          attributes: ["id", "image"],
        },
        {
          model: Tour_category,
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json(allTours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

router.put(('/tours'), async (req, res) =>{
  try {
    const {id, count} = req.body;
    const viewsTour = await Tour.findByPk(Number(id));
    const newViews = Number(viewsTour.views) + count;
    console.log(newViews)
    await Tour.update({views: newViews}, {where: {id: Number(id)}})
    res.json({text: 'OK'})
  } catch (error) {
    console.error('Счетчик', error)
    res.json({Счетчик: error})
  }

})
// router.get("/tours", async (req, res) => {
//   try {
//     const tours = await Tour.findAll({
//       include: { model: Tour_category },
//       raw: true,
//     });
//     const formatedTours = tours?.map((el) => {
//       const {
//         "Tour_category.id": categoryId,
//         "Tour_category.title": categoryTitle,
//         "Tour_category.createdAt": categoryCreatedAt,
//         "Tour_category.updatedAt": categoryUpdatedAt,
//         ...elData
//       } = el;
//       return {
//         ...elData,
//         categoryId,
//         categoryTitle,
//         categoryCreatedAt,
//         categoryUpdatedAt,
//       };
//     });

//     res.status(200).json(formatedTours);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error });
//   }
// });

router.get("/favourite", async (req, res) => {
  try {
    const favourite = await Favourite.findAll({ raw: true });
    res.json(favourite);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

router.post("/favourite", async (req, res) => {
  const { tour_id, user_id } = req.body;
  try {
    await Favourite.create({
      tour_id: Number(tour_id),
      user_id: Number(user_id),
    });
    res.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

router.delete("/favourite", async (req, res) => {
  const { tour_id, user_id } = req.body;
  try {
    await Favourite.destroy({
      where: { tour_id: Number(tour_id), user_id: Number(user_id) },
    });
    res.json({ message: "OK" });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

module.exports = router;
