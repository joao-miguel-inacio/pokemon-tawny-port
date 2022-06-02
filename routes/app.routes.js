import express from "express";
const router = express.Router();

import mongoose from "mongoose";

import isLoggedOut from "../middleware/isLoggedOut.js";
import isLoggedIn from "../middleware/isLoggedIn.js";

import User from "../models/User.model.js";
import Pokemon from "../models/Pokemon.model.js";

import Pokedex from 'pokedex-promise-v2';
import capitalized from "../utils/capitalized.js";
const MyPokedex = new Pokedex();

  router.get('/original-trainer-profile', async (req, res, next) => {
    try {
      res.render('app/original-trainer-profile');
    } catch (err) {
      next(err);
    }
  });

  router.get('/original-trainer-team', async (req, res, next) => {
    try {
      const pokemon = await Pokemon.find( {name: ['Blastoise', 'Dragonite', 'Gengar','Chansey', 'Ninetales', 'Mew']});
      console.log(pokemon)
      //const pokemon2 = await MyPokedex.getPokemonByName(['blastoise', 'dragonite', 'gengar','chansey', 'ninetales', 'mew']);
      
      res.render('app/original-trainer-team', {pokemon});
    } catch (err) {
      next(err);
    }
  });

  router.get('/pokemon-details/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
          const pokemonInArray = await Pokemon.find( {id : id} );
          const pokemon = pokemonInArray[0];
          const evolutionChainPokemons = await Pokemon.find( {name : pokemon.evolution_chain} );
          res.render('app/pokemon-details', {pokemon, evolutionChainPokemons});

          // const pokemon = await MyPokedex.getPokemonByName(id);
          // const pokemonSpecies = await MyPokedex.getPokemonSpeciesByName(id);
          // async function findEvoChainId (pokemonSpecies) {
          //   if (pokemonSpecies.evolution_chain.url.charAt(43) !== "/") {
          //     const chainId = pokemonSpecies.evolution_chain.url.charAt(42)+pokemonSpecies.evolution_chain.url.charAt(43);
          //     const pokemonEvolutionChain = await MyPokedex.getEvolutionChainById(chainId);
          //     return pokemonEvolutionChain;
          //   } else {
          //     const chainId = pokemonSpecies.evolution_chain.url.charAt(42);
          //     const pokemonEvolutionChain = await MyPokedex.getEvolutionChainById(chainId);
          //     return pokemonEvolutionChain;
          //   }
          // } 
          // const pokemonEvolutionChain = await findEvoChainId (pokemonSpecies);
          // if (String(pokemonEvolutionChain.chain.evolves_to) === "" ){
          //   res.render('app/pokemon-details', {pokemon, pokemonSpecies} );
          // } else {
          //   res.render('app/pokemon-details', {pokemon, pokemonSpecies, pokemonEvolutionChain} );
          // }
        //}

    } catch (err) {
      next(err);
    }
  });

  router.get('/pokemon-by-egg-group-list/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const pokemon = await Pokemon.find( {egg_groups : id} );

      // const eggGroupPokemon = await MyPokedex.getEggGroupByName(id);
      // const gen1Pokemon = await MyPokedex.getGenerationByName(1);
      // const pokemonNamesInEggGroup = eggGroupPokemon.pokemon_species.map(pokemon => pokemon.name);   
      // const pokemonNamesInGen1 = gen1Pokemon.pokemon_species.map(pokemon => pokemon.name);
      // const relevantPokemonNames = pokemonNamesInEggGroup.filter( name => pokemonNamesInGen1.indexOf(name) > -1);
      // const pokemon = await MyPokedex.getPokemonByName(relevantPokemonNames);

      res.render('app/pokemon-by-egg-group-list', {pokemon, id} );
    } catch (err) {
      next(err);
    }
  });

  router.get('/pokemon-search', async (req, res, next) => {
    try {
      const searchedPokemon = req.query.id;
      if (+searchedPokemon>151){
        res.render('app/search-unsuccessful');
      } else if (+searchedPokemon<=151){
        res.redirect(`/app/pokemon-details/${searchedPokemon}`);
      } else if (isNaN(+searchedPokemon)){
        const filteredSearchedPokemon = capitalized(searchedPokemon.toLowerCase().replace(/\s/g, ''));
        try {
          const pokemon = await Pokemon.find( {name: filteredSearchedPokemon});
          const searchedPokemonId = pokemon[0].id;
          res.redirect(`/app/pokemon-details/${searchedPokemonId}`);
        } catch {
          res.render('app/search-unsuccessful');
        }
      }
    } catch (err) {
      next(err);
    }
  });

  router.get('/pokedex', async (req, res, next) => {
    try {
      const pokemonShuffled = await Pokemon.find();

      // const gen1Pokemon = await MyPokedex.getGenerationByName(1);
      // const pokemonShuffled = await MyPokedex.getPokemonByName(gen1Pokemon.pokemon_species.map(pokemon => pokemon.name));

      const pokemon = (pokemonShuffled.sort((a,b) => a.id - b.id));
      res.render('app/pokedex', {pokemon});
    } catch (err) {
      next(err);
    }
  });

  router.get('/catch-pokemon/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const pokemonInArray = await Pokemon.find( {id : id} );
      const pokemon = pokemonInArray[0];
      const pokemonObjId = pokemonInArray[0]._id;
      const userId = req.session.user._id;
      const user = await User.findById(userId);
      const userObjId=user._id;
      await Pokemon.findByIdAndUpdate(pokemonObjId, { $addToSet: { trainer: userObjId } });
      await User.findByIdAndUpdate(userObjId, { $addToSet: { pokemon: pokemonObjId } });
      res.redirect('/app/own-pokemon-list');
    } catch (err) {
      next(err);
    }
  });
  
  router.get('/own-pokemon-list', async (req, res, next) => {
    try {
      const userId = req.session.user._id;
      const user = await User.findById(userId).populate("pokemon");
      const pokemon = user.pokemon;
      if (pokemon.length <1){
        const noPokemon = "No Pokemons caught yet";
        res.render('app/own-pokemon-list', {noPokemon});
      } else {
        res.render('app/own-pokemon-list', {pokemon});
      }
    } catch (err) {
      next(err);
    }
  });

  router.get('/own-profile', async (req, res, next) => {
    try {
      const userObjId = req.session.user._id;
      const user = await User.findById(userObjId).populate("pokemon");
      const teamLength = user.pokemon.length;
      res.render('app/own-profile', {user, teamLength});
    } catch (err) {
      next(err);
    }
  });

  router.get('/edit-profile', async (req, res, next) => {
    try {
      res.render('app/edit-profile');
    } catch (err) {
      next(err);
    }
  });

  router.post('/edit-profile', async (req, res, next) => {
    try {
      const userObjId = req.session.user._id;
      const { name, username, image, description, password } = req.body;
      await User.findByIdAndUpdate(userObjId,  
        { name, username, image, description }, 
        { new: true });
      res.redirect('own-profile');
    } catch (err) {
      next(err);
    }
  });

  router.get('/trainer-list', async (req, res, next) => {
    try {
      const trainers = await User.find();
      const user = req.session.user;
      const userIndex = trainers.indexOf(user);
      trainers.splice(userIndex, 1);
      res.render('app/trainer-list', {trainers});
    } catch (err) {
      next(err);
    }
  });

  router.get('/trainer-profile/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const trainerInArray = await User.find( {_id : id });
      const trainer = trainerInArray[0];
      res.render('app/trainer-profile', {trainer});
    } catch (err) {
      next(err);
    }
  });

  router.get('/trainer-team/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const trainerInArray = await User.find( {_id : id }).populate("pokemon");
      const pokemon = trainerInArray[0].pokemon;
      res.render('app/trainer-team', {pokemon});
    } catch (err) {
      next(err);
    }
  });

export default router;