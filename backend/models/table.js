const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    tableNumber: {type: Number, unique: true, required: true},
    seats: {type: Number, required: true}
});

module.exports = mongoose.model("Table", tableSchema);