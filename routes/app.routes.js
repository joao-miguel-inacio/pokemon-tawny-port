import express from "express";
const router = express.Router();

import mongoose from "mongoose";

import isLoggedIn from "../middleware/isLoggedIn.js";

import User from "../models/User.model.js";
import Pokemon from "../models/Pokemon.model.js";

router.get('/home', async (req, res, next) => {
    try {
      res.render('app/home');
    } catch (err) {
      next(err);
    }
  });

  router.get('/original-trainer-profile', async (req, res, next) => {
    try {
      res.render('app/original-trainer-profile');
    } catch (err) {
      next(err);
    }
  });

  router.get('/original-trainer-team', async (req, res, next) => {
    try {
      res.render('app/original-trainer-team');
    } catch (err) {
      next(err);
    }
  });

  router.get('/original-trainer-pokedex', async (req, res, next) => {
    try {
      res.render('app/original-trainer-pokedex');
    } catch (err) {
      next(err);
    }
  });
  
export default router;