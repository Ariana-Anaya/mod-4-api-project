const router = require('express').Router();
const models = require('../../db/models');

router.get('/current', async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            const bookings = await models.Booking.findAll({
                where: { userId: user.id },
                include: [{ model: models.Spot }]
            });
            return res.status(200).json({ Bookings: bookings });
        }
        res.status(401).json({ message: 'Not Permitted'});
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong'});
    }
});

router.put('/:bookingId', async (req, res, next) => {
    const { start, end } = req.body;
    
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const isValidBookingDate = startDate < endDate;
    
    const booking = await models.Booking.findByPk(req.params.bookingId);
    
    if (!req.user || req.user.id !== booking.userId) {
        return res.status(403).json({
            message: "Booking owned by another User",
            errors: {
                username: "userId and bookingID do not match"
            }
        });
    }
    
    const overlappingBookings = await models.Booking.findAll({
        where: {
            spotId: booking.spotId, // same spot
            id: { [models.Sequelize.Op.ne]: booking.id }, 
            [models.Sequelize.Op.or]: [
                { startDate: { [models.Sequelize.Op.between]: [startDate, endDate] } },
                { endDate: { [models.Sequelize.Op.between]: [startDate, endDate] } }
            ]
        }
    });

    const isAllowedToBook = overlappingBookings.length === 0;

    if (!isValidBookingDate || !isAllowedToBook) {
        return res.status(403).json({
            message: "Cannot book: invalid dates or overlap"
        });
    }
    
    if (startDate) {
        booking.startDate = startDate;
    }
    if (endDate) {
        booking.endDate = endDate;
    }

    await booking.save();
    return res.status(200).json(booking);
});

router.delete('/:bookingId', async (req, res) => {
    const booking = await models.Booking.findByPk(req.params.bookingId);
    if (!booking) {
        return res.status(404).json({
            message: "Booking not Found"
        });
    }
    if (req.user.id !== booking.userId) {
        return res.status(403).json({
            message: "Booking owned by another user",
            errors: {
                username: "userId and bookingID do not match"
            }
        });
    }
    await booking.destroy();
    return res.status(200).json({
        message: "Booking deleted"
    });
});

// delete (testing)
router.delete('/spot/:spotId', async (req, res) => {
    const spot = await models.Spot.findByPk(Number(req.params.spotId));
    await spot.destroy();
    return res.json({
        message: "Spot deleted",
        Spot: spot
    });
});    

module.exports = router;
