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
      const pokemon = await Pokemon.find( {name: ['blastoise', 'dragonite', 'gengar','chansey', 'ninetales', 'mew']});
      //const pokemon2 = await MyPokedex.getPokemonByName(['blastoise', 'dragonite', 'gengar','chansey', 'ninetales', 'mew']);
      res.render('app/original-trainer-team', {pokemon});
    } catch (err) {
      next(err);
    }
  });

  router.get('/pokemon-details/:id', async (req, res, next) => {
    try {
      try {
        const { id } = req.params;
        if (id <= 151){
          const pokemonInArray = await Pokemon.find( {id : id} );
          const pokemon = pokemonInArray[0];
          console.log(pokemon.evolution_chain)
          res.render('app/pokemon-details', {pokemon});
        } else {
          //because only 1st generation pokemons are seeded in the database
          const pokemonNotGen1 = await MyPokedex.getPokemonByName(id);
          const pokemonSpecies = await MyPokedex.getPokemonSpeciesByName(id);
          async function findEvoChainId (pokemonSpecies) {
            if (pokemonSpecies.evolution_chain.url.charAt(43) !== "/") {
              const chainId = pokemonSpecies.evolution_chain.url.charAt(42)+pokemonSpecies.evolution_chain.url.charAt(43);
              const pokemonEvolutionChain = await MyPokedex.getEvolutionChainById(chainId);
              return pokemonEvolutionChain;
            } else {
              const chainId = pokemonSpecies.evolution_chain.url.charAt(42);
              const pokemonEvolutionChain = await MyPokedex.getEvolutionChainById(chainId);
              return pokemonEvolutionChain;
            }
          } 
          const pokemonEvolutionChain = await findEvoChainId (pokemonSpecies);
          if (String(pokemonEvolutionChain.chain.evolves_to) === "" ){
            res.render('app/pokemon-details', {pokemonNotGen1, pokemonSpecies} );
          } else {
            res.render('app/pokemon-details', {pokemonNotGen1, pokemonSpecies, pokemonEvolutionChain} );
          }
        }
      } catch (err) {
        res.render('app/search-unsuccessful');
      }
    } catch (err) {
      next(err);
    }
  });

  router.get('/pokemon-by-egg-group-list/:id', async (req, res, next) => {
    //can be based on the database
    try {
      const { id } = req.params;
      const eggGroupPokemon = await MyPokedex.getEggGroupByName(id);
      const gen1Pokemon = await MyPokedex.getGenerationByName(1);
      const pokemonNamesInEggGroup = eggGroupPokemon.pokemon_species.map(pokemon => pokemon.name);   
      const pokemonNamesInGen1 = gen1Pokemon.pokemon_species.map(pokemon => pokemon.name);
      const relevantPokemonNames = pokemonNamesInEggGroup.filter( name => pokemonNamesInGen1.indexOf(name) > -1);
      const pokemon = await MyPokedex.getPokemonByName(relevantPokemonNames);
      res.render('app/pokemon-by-egg-group-list', {pokemon, id} );
    } catch (err) {
      next(err);
    }
  });

  router.get('/pokemon-search', async (req, res, next) => {
    try {
      const searchedPokemon = req.query.id;
      const filteredSearchedPokemon = searchedPokemon.toLowerCase().replace(/\s/g, '');
      if (filteredSearchedPokemon === "nidoran"){
        res.redirect(`/app/pokemon-details/nidoran-m`);
      } else if (filteredSearchedPokemon === "mime" || filteredSearchedPokemon === "mrmime" || filteredSearchedPokemon === "mr") {
        res.redirect(`/app/pokemon-details/mr-mime`);
      } else {
        res.redirect(`/app/pokemon-details/${filteredSearchedPokemon}`);
      }
    } catch (err) {
      next(err);
    }
  });

  router.get('/pokedex', async (req, res, next) => {
    try {
      const gen1Pokemon = await MyPokedex.getGenerationByName(1);
      const pokemonShuffled = await MyPokedex.getPokemonByName(gen1Pokemon.pokemon_species.map(pokemon => pokemon.name));
      const pokemon = (pokemonShuffled.sort((a,b) => a.id - b.id));
      res.render('app/pokedex', {pokemon});
    } catch (err) {
      next(err);
    }
  });
  
export default router;