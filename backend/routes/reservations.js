var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation');
var Table = require('../models/table');
var passport = require('passport');
const { isAuthenticated } = require('../utils/auth');




// POST /reservations
// router.post('/reservation', isAuthenticated, async (req, res) => {
//     try{
//         const { tableId, reservationDate, reservationTime, numberOfGuest, specialRequests } = req.body;



//     }
// }); 

module.exports = router;