var express = require('express');
var router = express.Router();
var bus = require('../models/Buses');


// router.get('/', (req, res) => {
//     bus.find({ companyName, startCity, totalseats, availableseats }, (err, result) => {
//         if (err) res.send(err)
//         else res.json({ result })
//     })
// })

router.get('/available', async (req, res) => {
    const { startCity, destination, date } = req.query; // Use req.query for GET request
    try {
        const buses = await bus.find({
            startCity: startCity,
            destination: destination,
            date: new Date(date) // Ensure date is a Date object
        });

        res.status(200).json({
            success: true,
            buses
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error retrieving buses",
            error: err.message
        });
    }
});


router.post('/', (req, res) => {

    bus.find({ 'startCity': req.body.startCity, 'destination': req.body.destination }).exec((err, bus) => {
        if (err) {
            res.json({ status: false, message: "error while searching" })
        }
        else res.json({ bus })
    })
})

router.post('/', (req, res) => {

    bus.findOne({ _id: req.body.bId }, (err, bus) => {
        if (err) {
            res.json({ status: false, message: "error while searching with ID" })
        }
        else
            res.json({ bus })
    })
})

// router.post('/', (req, res) => {
//     let newBus = new bus(req.body)
//     newBus.save((err, bus) => {
//         if (err) console.log(err)
//         else res.status(201).json(bus)
//     })
// })
















module.exports = router;
