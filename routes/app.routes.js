const router = require("express").Router();
const mongoose = require("mongoose");

const isLoggedIn = require("../middleware/isLoggedIn.js");

const User = require ("../models/User.model.js");
const Pokemon = require("../models/Pokemon.model.js");

router.get('/home', async (req, res, next) => {
    try {
      res.render('app/home');
    } catch (err) {
      next(err);
    }
  });
  
module.exports = router;