const busData = require("./busInfo");
const Bus = require("./models/Buses");


async function seedBusData() {
    for (let b of busData) { // Change 'for (let b in busData)' to 'for (let b of busData)'
        const newBus = new Bus(b); // Pass the entire bus object
        await newBus.save();
    }
}

module.exports = seedBusData;
