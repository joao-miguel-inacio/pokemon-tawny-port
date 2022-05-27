import express from "express";
const router = express.Router();

import mongoose from "mongoose";

import isLoggedIn from "../middleware/isLoggedIn.js";

import User from "../models/User.model.js";
import Pokemon from "../models/Pokemon.model.js";

import Pokedex from 'pokedex-promise-v2';
const MyPokedex = new Pokedex();

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
      const myPokemon = await MyPokedex.getPokemonByName(['blastoise', 'dragonite', 'gengar','chansey', 'ninetales', 'mew']);
      res.render('app/original-trainer-team', {myPokemon});
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

  //ADD MIDDLEWARE!! ISLOGGEDIN
  router.get('/pokemon-details/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const pokemon = await MyPokedex.getPokemonByName(id);
      const pokemonSpecie = await MyPokedex.getPokemonSpeciesByName(id);

      async function findEvoChainId (pokemonSpecie) {
        if (pokemonSpecie.evolution_chain.url.charAt(43) !== "/") {
          const chainId = pokemonSpecie.evolution_chain.url.charAt(42)+pokemonSpecie.evolution_chain.url.charAt(43);
          const pokemonEvolutionChain = await MyPokedex.getEvolutionChainById(chainId);
        } else {
          const chainId = pokemonSpecie.evolution_chain.url.charAt(42);
          const pokemonEvolutionChain = await MyPokedex.getEvolutionChainById(chainId);
        }
      } 
      const pokemonEvolutionChain = await findEvoChainId (pokemonSpecie);
      console.log(pokemonEvolutionChain)
      console.log("hey")

      res.render('app/pokemon-details', {pokemon, pokemonSpecie, pokemonEvolutionChain} );
    } catch (err) {
      next(err);
    }
  });
  
export default router;