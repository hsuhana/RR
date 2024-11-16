var express = require('express');
var router = express.Router();
var Member = require('../models/member');

router.post('/register', async (req, res) => {
  try{
    const { firstName, lastName, username, password, email, phoneNumber, birthday } = req.body;

    const newMember = new Member({
      firstName,
      lastName,
      username,
      password,
      email,
      phoneNumber,
      birthday,
    });

    await newMember.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = router;
