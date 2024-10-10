const express = require("express");
const {
  Tour,
  Tour_category,
  Favourite,
  Tour_image,
  User,
} = require("../db/models");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const favouriteCard = await Favourite.findAll({
      where: { user_id: Number(id) },
      include: [
        {
          model: Tour,
          include: [
            {
              model: Tour_category,
            },
            {
              model: Tour_image,
              attributes: ["id", "image"],
            },
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
      raw: true,
    });
    console.log("favouriteCard", favouriteCard);
    const formatedFavouriteCard = favouriteCard?.map((el) => {
      const {
        "Tour.id": id,
        "Tour.category_id": category_id,
        "Tour.title": title,
        "Tour.content": content,
        "Tour.schegule": schegule,
        "Tour.duration": duration,
        "Tour.start_time": starttime,
        "Tour.guide_id": guide_id,
        "Tour.cost": cost,
        "Tour.Tour_category.title": categoryTitle,
        "Tour.Tour_images.image": Tour_images,
        "Tour.User.name": userName,
      } = el;
      return {
        id,
        category_id,
        title,
        content,
        schegule,
        starttime,
        duration,
        guide_id,
        cost,
        categoryTitle,
        Tour_images,
        userName,
      };
    });
    res.json(formatedFavouriteCard);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

module.exports = router;
