const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const Member = require("../models/member");

// GET /profile
router.get('/profile', async (req, res) => {
  try{
    //console.log('Session after login:', req.session);
    // Retrieve the member details

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
  
    console.log("User in session:", req.user); // Log session data to debug

    const member = await Member.findById(req.user._id).select("-password");

    // Retrieve reservations associated with the member
    const reservations = await Reservation.find({ member: req.user._id }).populate("tableId");

    res.status(200).json({ 
      success: true, 
      member, 
      reservations 
    });

  }catch(error){
    
    //console.log("User:", req.user);
    //res.status(500).json({ success: false, message: "Error fetching profile data.", error });
    console.error("Error fetching profile data:", error); // Log the error details
    res.status(500).json({ 
      success: false, 
      message: "Error fetching profile data.", 
      error: error.message || "Internal Server Error" 
    });
  }
});

// PATCH /profile
router.patch("/profile", async (req, res) => {
  try {
      const userId = req.user._id; // Assuming authentication middleware sets req.user
      const updates = req.body;

      const member = await Member.findByIdAndUpdate(userId, updates, {
          new: true, // Return the updated document
          runValidators: true, // Validate updates
      });

      if (!member) {
          return res.status(404).json({ message: "Member not found." });
      }

      res.status(200).json({ member });
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

module.exports = router;
