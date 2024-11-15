const mongoose = require("mongoose");
const member = require("./member");

const reservationSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        required: true
    },
    reservationDate: {
        type: Date,
        required: true
    },
    reservationTime: {
        type: String,
        required: true,
        match: [/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, 'Please enter a valid time in HH:MM format']
    },
    numberOfGuests: {
        type: Number,
        required: true,
        min: 1
    },
    specialRequests: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    }
});

reservationSchema.index({table: 1, reservationDate: 1, reservationTime: 1}, {unique: true});
module.exports = mongoose.model("Reservation", reservationSchema);