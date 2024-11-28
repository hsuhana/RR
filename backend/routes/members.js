const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const Member = require("../models/member");

// GET /profile
router.get('/profile', async (req, res) => {
  try{
    // Retrieve the member details
    const member = await Member.findById(req.user._id).select("-password");

    // Retrieve reservations associated with the member
    const reservations = await Reservation.find({ member: req.user._id }).populate("tableId");

    res.status(200).json({ 
      success: true, 
      member, 
      reservations 
    });

  }catch(error){
    res.status(500).json({ success: false, message: "Error fetching profile data.", error });
  }
});

module.exports = router;
