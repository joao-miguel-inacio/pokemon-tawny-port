import express from "express";
const router = express.Router();

import mongoose from "mongoose";

import isLoggedOut from "../middleware/isLoggedOut.js";
import isLoggedIn from "../middleware/isLoggedIn.js";

import User from "../models/User.model.js";
import Pokemon from "../models/Pokemon.model.js";

import Pokedex from "pokedex-promise-v2";
import capitalized from "../utils/capitalized.js";
const MyPokedex = new Pokedex();

//ORIGINAL TRAINER

router.get("/original-trainer-profile", async (req, res, next) => {
  try {
    res.render("app/original-trainer-profile");
  } catch (err) {
    next(err);
  }
});

router.get("/original-trainer-team", async (req, res, next) => {
  try {
    const pokemon = await Pokemon.find({
      name: ["Blastoise", "Dragonite", "Gengar", "Chansey", "Ninetales", "Mew"],
    });

    //const pokemon2 = await MyPokedex.getPokemonByName(['blastoise', 'dragonite', 'gengar','chansey', 'ninetales', 'mew']);

    res.render("app/original-trainer-team", { pokemon });
  } catch (err) {
    next(err);
  }
});

//POKEDEX

router.get("/pokedex", async (req, res, next) => {
  try {
    const pokemonShuffled = await Pokemon.find();

    // const gen1Pokemon = await MyPokedex.getGenerationByName(1);
    // const pokemonShuffled = await MyPokedex.getPokemonByName(gen1Pokemon.pokemon_species.map(pokemon => pokemon.name));

    const pokemon = pokemonShuffled.sort((a, b) => a.id - b.id);
    res.render("app/pokedex", { pokemon });
  } catch (err) {
    next(err);
  }
});

//POKEMON DETAILS

router.get("/pokemon-details/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const pokemonInArray = await Pokemon.find({ id: id });
    const pokemon = pokemonInArray[0];

    const evolutionChainPokemons = await Pokemon.find({
      name: pokemon.evolution_chain
    });
    if (req.session.user){
        const userId = req.session.user._id;
      const user = await User.findById(userId);
      if(user.pokemon.find( element => element._id.toString() === pokemon._id.toString())){
        const caught = "caught";
        res.render("app/pokemon-details", { pokemon, evolutionChainPokemons, caught });
      } else {
        const newPokemon = "newPokemon"
        res.render("app/pokemon-details", { pokemon, evolutionChainPokemons, newPokemon });
      }   
    } else {
      res.render("app/pokemon-details", { pokemon, evolutionChainPokemons });
    }

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

//POKEMON BY EGG GROUP

router.get("/pokemon-by-egg-group-list/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.find({ egg_groups: id });

    // const eggGroupPokemon = await MyPokedex.getEggGroupByName(id);
    // const gen1Pokemon = await MyPokedex.getGenerationByName(1);
    // const pokemonNamesInEggGroup = eggGroupPokemon.pokemon_species.map(pokemon => pokemon.name);
    // const pokemonNamesInGen1 = gen1Pokemon.pokemon_species.map(pokemon => pokemon.name);
    // const relevantPokemonNames = pokemonNamesInEggGroup.filter( name => pokemonNamesInGen1.indexOf(name) > -1);
    // const pokemon = await MyPokedex.getPokemonByName(relevantPokemonNames);

    res.render("app/pokemon-by-egg-group-list", { pokemon, id });
  } catch (err) {
    next(err);
  }
});

//SEARCH

router.get("/pokemon-search", async (req, res, next) => {
  try {
    const searchedPokemon = req.query.id;
    if (+searchedPokemon > 151) {
      res.render("app/pokemon-search-unsuccessful");
    } else if (+searchedPokemon <= 151) {
      res.redirect(`/app/pokemon-details/${searchedPokemon}`);
    } else if (isNaN(+searchedPokemon)) {
      const filteredSearchedPokemon = capitalized(
        searchedPokemon.toLowerCase().replace(/\s/g, "")
      );
      try {
        if (filteredSearchedPokemon === "Nidoran" || filteredSearchedPokemon === "Nidonanf" || filteredSearchedPokemon === "Nidoranfemale") {
          res.redirect(`/app/pokemon-details/29`);
        } else if (filteredSearchedPokemon === "Nidonanm" || filteredSearchedPokemon === "Nidoranmale" ) {
          res.redirect(`/app/pokemon-details/32`);
        } else if (filteredSearchedPokemon === "Mr.mime" || filteredSearchedPokemon === "Mrmime" || filteredSearchedPokemon === "Mime" ) {
          res.redirect(`/app/pokemon-details/122`);
        } else {
        const pokemon = await Pokemon.find({ name: filteredSearchedPokemon });
        const searchedPokemonId = pokemon[0].id;
        res.redirect(`/app/pokemon-details/${searchedPokemonId}`);
        }
      } catch {
        res.render("app/pokemon-search-unsuccessful");
      }
    }
  } catch (err) {
    next(err);
  }
});

//OWN PROFILE

router.get("/own-profile", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate("pokemon");
    console.log(user)
    res.render("app/own-profile", { user });
  } catch (err) {
    next(err);
  }
});
router.get("/own-profile-edit", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    res.render("app/own-profile-edit", { user });
  } catch (err) {
    next(err);
  }
});

router.post("/own-profile-edit", async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const { name, username, image, description, password } = req.body;
    await User.findByIdAndUpdate(
      userId,
      { name, username, image, description },
      { new: true }
    );
    res.redirect("own-profile");
  } catch (err) {
    next(err);
  }
});

//CATCH POKEMON

router.get("/catch-pokemon/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const pokemonInArray = await Pokemon.find({ id: id });
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { pokemon: pokemonInArray[0]._id },
    });
    if (user.team.length < 6){
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { team: pokemonInArray[0]._id  },
      });
    }
    res.redirect("/app/own-pokemon-team");
  } catch (err) {
    next(err);
  }
});

//OWN TEAM

router.get("/own-pokemon-team", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate("team");
    const pokemon = user.team;
    if (pokemon.length < 1) {
      const noPokemon = "No Pokemons caught yet";
      res.render("app/own-pokemon-team", { noPokemon });
    } else {
      res.render("app/own-pokemon-team", { pokemon });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/own-pokemon-team-edit/", isLoggedIn, async (req, res, next) => {
  try {
    try {
      const userId = req.session.user._id;
      const user = await User.findById(userId).populate("pokemon").populate("team");
      if (user.pokemon.length < 1) {
        const noPokemon = "No Pokemons caught yet";
        res.render("app/own-pokemon-team-edit", { noPokemon });
      } else {
        if (user.pokemon.length <= 6){
          const pokemonInTeam = user.team;
          res.render("app/own-pokemon-team-edit", { pokemonInTeam });
        } else {
          const pokemonArray = user.pokemon;
          const pokemonInTeam = user.team; 
          function pokemonCleaner (pokemonArray, pokemonInTeam) {
            const pokemon = ( pokemonArray.filter ( el => !pokemonInTeam
              .find(element => element._id.toString() === el._id.toString() )))
              .sort((a, b) => a.id - b.id);
            return pokemon;
          }
          const pokemon = pokemonCleaner(pokemonArray, pokemonInTeam);
          res.render("app/own-pokemon-team-edit", { pokemon, pokemonInTeam});
        }
      }
    } catch (err) {
      next(err);
    }  
  } catch (err) {
    next(err);
  }
});


router.get("/own-pokemon-team-edit/json-list", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate("pokemon").populate("team");
    const userTeam = user.team;
    const userPokemon = user.Pokemon;
    res.json ([userTeam, userPokemon]);
  } catch (err) {
    next(err);
  }
});


router.post("/own-pokemon-team-edit-add/:id", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate("pokemon").populate("team");
    const { id } = req.params;
    const pokemonInArray = await Pokemon.find({ id: id });
    const pokemonObjId = pokemonInArray[0]._id.toString();
    //if (user.team.includes(pokemonObjId)) {
    for (let i=0; i<user.team.length; i++ ){
      if (user.team[i]._id.toString() === pokemonObjId){
        console.log("pokemon already in the team");
        //POP UP WINDOW //NOT REALLY NECESSARY AS POKEMON IN TEAM SHOULDNT BE IN POKEMON TABLE
        res.redirect("/app/own-pokemon-team-edit");
      } else if (user.team.length >= 6) {
        user.team.splice(0, 1, pokemonObjId);
        await User.findByIdAndUpdate( userId,
           { team : user.team },
           { new: true }
        );
        res.redirect("/app/own-pokemon-team-edit");
      } else {
        await User.findByIdAndUpdate(userId, {
          $addToSet: { team: pokemonObjId },
        });
        res.redirect("/app/own-pokemon-team-edit");
      }
    }    
  } catch (err) {
    next(err);
  }
});

router.post("/own-pokemon-team-edit-remove/:id", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate("team");
    const { id } = req.params;
    const pokemonInArray = await Pokemon.find({ id: id });
    const pokemonObjId = pokemonInArray[0]._id;
    const pokemonIndexInTeam = user.team.findIndex( object => object._id.toString() === pokemonObjId.toString() );
    if (user.team.length>1){
      user.team.splice(pokemonIndexInTeam, 1);
      await User.findByIdAndUpdate( userId,
        { team : user.team },
        { new: true }
      );
      res.redirect("/app/own-pokemon-team-edit");
    } else {
      console.log("You need at least one Pokemon in your party!");
      //POP UP WINDOW
      res.redirect("/app/own-pokemon-team-edit");
    }
  } catch (err) {
    next(err);
  }
});

//OTHER TRAINERS

router.get("/trainer-list", isLoggedIn, async (req, res, next) => {
  try {
    const trainers = await User.find();
    const user = req.session.user;
    const userIndex = trainers.findIndex(object => object._id.toString() === user._id.toString() );
    trainers.splice(userIndex, 1);
    res.render("app/trainer-list", { trainers });
  } catch (err) {
    next(err);
  }
});

router.get("/trainer-profile/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const trainerInArray = await User.find({ _id: id });
    const trainer = trainerInArray[0];
    res.render("app/trainer-profile", { trainer });
  } catch (err) {
    next(err);
  }
});

router.get("/trainer-team/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const trainerInArray = await User.find({ _id: id }).populate("team");
    const pokemon = trainerInArray[0].team;
    const trainer = trainerInArray[0];
    if (pokemon.length < 1) {
      const noPokemon = "No Pokemons caught yet";
      res.render("app/trainer-team", { noPokemon, trainer });
    } else {
      res.render("app/trainer-team", { pokemon, trainer});
    }
  } catch (err) {
    next(err);
  }
});

export default router;
