const express = require('express');
const { Booking, Tour, Tour_category, City, Tour_image, User } = require('../db/models')

const router = express.Router();

router.post('/', async (req, res) => {
    const {tour_id, user_id, date} = req.body;
    if (date === undefined){
        res.status(200).json({ text: 'no date'} )
    }
    try {
        await Booking.create({ tour_id: Number(tour_id), user_id: Number(user_id), date})
        res.status(200).json({text: 'OK'})
    } catch (error) {
       console.error(error)
        res.status(500).json({text: 'Ошибка при записи в бд. Ручка /booking'}) 
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const bookingTour = await Booking.findAll( { where: { user_id: Number(id) },
        attributes: ['tour_id', 'date'],
        include: [{
            model: Tour,
            attributes: [
                'title',
                'content',
                'schegule',
                'duration',
                'start_time',
                'number_of_tour_participants',
                'cost'
            ],
                include: [
                    {
                        model: Tour_category,
                        attributes: [
                            'title'
                        ]
                    },
                    {
                        model: City,
                        attributes: [
                            'title'
                        ]
                    },
                    {
                        model: Tour_image,
                        attributes: ["id", "image"],
                      },
                    {
                        model: User,
                        attributes: ["name"],
                      },
                ]
        }],
    })
    const formatedBookingTour = bookingTour?.map(booking => {
        const tourData = booking.Tour.toJSON();
        return {
            date: booking.date,
            ...tourData,
            Tour_category: tourData.Tour_category,
            City: tourData.City,
            Tour_images: Array.isArray(tourData.Tour_images) ? tourData.Tour_images : [tourData.Tour_images],
            User: tourData.User,
        };
    });
    res.json(formatedBookingTour)
    } catch (error) {
        console.error(error)
    }
    
})

module.exports = router

