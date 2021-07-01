
const mongoose = require("mongoose");

const Reservation = mongoose.model(
    "Reservation",
    new mongoose.Schema({
        from: String,
        to: String,
        room: String,
        hotelId: String,
        hotelName: String,
        roomType: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    })
);

module.exports = Reservation;