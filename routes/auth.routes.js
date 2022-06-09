import express from "express";
const router = express.Router();

import bcrypt from "bcrypt";

import mongoose from "mongoose";

import User from "../models/User.model.js";
import Pokemon from "../models/Pokemon.model.js";

import isLoggedOut from "../middleware/isLoggedOut.js";
import isLoggedIn from "../middleware/isLoggedIn.js";

import uploader from "../config/cloudinary.config.js";

const saltRounds = 10;

router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", uploader.single('image'), isLoggedOut, async (req, res, next) => {
//router.post("/signup", isLoggedOut, (req, res) => {
  const { name, username, description, password } = req.body;
  console.log('hi')
  if (!req.file) {
    const pokemonID = Math.floor(Math.random() * 151);
    const pokemon = await Pokemon.find( {id:pokemonID});
    const pokemonImg = pokemon[0].sprites.front_animated;
    req.file = {};
    req.file.path = pokemonImg;
  }

  if (!name) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Please provide your name.",
    });
  }
  console.log('hi1')
  if (!username) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Please provide your username.",
    });
  }
  console.log('hi2')
  if (!description) {
    return res.status(400).render("auth/signup", {
      errorMessage: "What kind of trainer are you?",
    });
  }
  console.log('hi3')
  if (password.length < 8) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }
  console.log('hi4')
  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).render("signup", {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */

  // Search the database for a user with the username submitted in the form
  User.findOne({ username }).then((found) => {
    if (found) {
      return res
        .status(400)
        .render("auth.signup", { errorMessage: "Username already taken." });
    }
    console.log('hi5')
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        console.log('Creating user?')
        return User.create({
          name,
          username,
          image: req.file.path,
          description,
          password: hashedPassword,
        });
      })
      .then((user) => {
        console.log('created User')
        req.session.user = user;
        req.app.locals.user = req.session.user;
        req.app.locals.inSession = true;
        req.app.locals.anonymous = false;
        res.redirect("/");
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res
            .status(400)
            .render("auth/signup", { errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).render("auth/signup", {
            errorMessage:
              "Username need to be unique. The username you chose is already in use.",
          });
        }
        return next(error)
        return res
          .status(500)
          .render("auth/signup", { errorMessage: error.message });
      });
  });
});

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

router.post("/login", isLoggedOut, (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).render("auth/login", {
      errorMessage: "Please provide your username.",
    });
  }

  if (password.length < 8) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(400).render("auth/login", {
          errorMessage: "Wrong credentials.",
        });
      }

      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).render("auth/login", {
            errorMessage: "Wrong credentials.",
          });
        }
        req.session.user = user;
        req.app.locals.user = req.session.user;
        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        req.app.locals.inSession = true;
        req.app.locals.anonymous = false;
        
        return res.redirect("/");
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
    req.app.locals.inSession = false;
    req.app.locals.anonymous = true;
    res.redirect("/");
  });
});

export default router;
