const express = require('express');
const {Custom_tour, Custom_tour_to_place} = require('../db/models');


const router = express.Router();

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        await Custom_tour_to_place.destroy({where: {custom_tour_id: Number(id)}})
        await Custom_tour.destroy({where: {id: Number(id)}})
        res.json({text: 'OK'})
    } catch (error) {
        console.error('Ручка удаления кастомного тура', error)
        res.json(error)
    }
})

module.exports=router   