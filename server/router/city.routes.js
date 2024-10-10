const express = require('express');
const {Tour, City, Tour_category, Tour_image, User} = require('../db/models')
const router = express.Router();

router.get('/:city', async (req, res) => {
    const {city} = req.params;
    try {
        const cityOne = await City.findOne({where: {title: city}});
        const city_id = Number(cityOne.id);
        const tourCity = await Tour.findAll({where: {city_id}, 
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
        res.json(tourCity)
    } catch (error) {
        console.error('Подтягивание по городам', error)
        res.json(error)
    }
})

module.exports = router