import "../db/index.js";

import mongoose from "mongoose";

import Pokemon from "../models/Pokemon.model.js";

import capitalized from "../utils/capitalized.js";

import Pokedex from "pokedex-promise-v2";
const MyPokedex = new Pokedex();
let pokemonsArray = [];

const pokemonSeed = async () => {
  try {
    await Pokemon.deleteMany();
    const allPokemons = await Pokemon.create(pokemonsArray);
    console.log(`${allPokemons.length} pokemons created`);
    await mongoose.connection.close();
    console.log(`Disconnected from Mongo`);
  } catch (error) {
    console.error(error);
  }
};

const evolutionChainArrayCreator = () => {
  const data3Array = [];
  for (let i = 1; i <= 78; i++) {
    data3Array.push(MyPokedex.getEvolutionChainById(i));
  }
  //data3Array is now array with all information received using getEvolutionChainById
  return data3Array;
};

const createPokemons = async () => {
  const data1Array = [];
  const data2Array = [];

  for (let i = 1; i <= 151; i++) {
    data1Array.push(await MyPokedex.getPokemonByName(i));
    data2Array.push(await MyPokedex.getPokemonSpeciesByName(i));
  }

  Promise.all(data1Array, data2Array).then(() => {
    //data1Array is now array with all information received using getPokemonByName
    //data2Array is now array with all information received using getPokemonSpeciesByName

    Promise.all(evolutionChainArrayCreator()).then(async (res) => {
      //res is data3Array because this is the res of evolutionChainArrayCreator. res is what it evolutionChainArratCreator is returning

      let evolutionChainsArray = [];
      for (let i = 0; i <= 77; i++) {
        const first = res[i]?.chain?.species?.name;
        const second = res[i]?.chain?.evolves_to[0]?.species.name;
        const third = res[i]?.chain?.evolves_to[0]?.evolves_to[0]?.species.name;
        if (second === undefined){
          const capitalizedFirst = capitalized(first);
          evolutionChainsArray.push([capitalizedFirst, second, third]);
        } else if (third === undefined) {
          const capitalizedFirst = capitalized(first);
          const capitalizedSecond = capitalized(second);
          evolutionChainsArray.push([capitalizedFirst, capitalizedSecond, third]);
        } else {
          const capitalizedFirst = capitalized(first);
          const capitalizedSecond = capitalized(second);
          const capitalizedThird = capitalized(third);
          evolutionChainsArray.push([capitalizedFirst, capitalizedSecond, capitalizedThird]);
        }
        
        //evolutionChainsArray is now [[baby, teen, adult],[baby, teen, adult],[baby, teen, adult],[baby, teen, undefined],[baby, undefined, undefined] x78]
      }

      for (let i = 0; i <= 150; i++) {

        let relevantEvolutionChain = evolutionChainsArray.find((element) => {
          const relevantName = capitalized(data1Array[i].name)
          return element.includes(relevantName);
          //for each of the 151 pokemons, this will find the element (array), in the evolutionChainsArray, that contains the name of the pokemon we are iteration over.
          //this will be returned as true and become the relevantEvolutionChain to be sent to our DB on the current iteration
        });

        if (data1Array[i].name === "eevee" ) {
          relevantEvolutionChain = ["Vaporeon", "Jolteon", "Flareon"];
        }
        if (data1Array[i].name === "vaporeon" ) {
          relevantEvolutionChain = ["Eevee", "Vaporeon", undefined];
        }
        if (data1Array[i].name === "jolteon" ) {
          relevantEvolutionChain = ["Eevee", "Jolteon", undefined];
        }     
        if (data1Array[i].name === "flareon" ) {
          relevantEvolutionChain = ["Eevee", "Flareon", undefined];
        }      

        const types = [];
        const typesRawData = data1Array[i].types;
        //extracts array relative to the types from the data1Array
        typesRawData.forEach((element) => types.push(capitalized(element.type.name)));
        //this will iterate over the raw data on types for the specific pokemon we are iterating over and push just the type.name into our newly created array

        const eggGroups = [];
        const eggGroupsRawData = data2Array[i].egg_groups;
        //extracts array relative to the egg groups from the data2Array
        eggGroupsRawData.forEach((element) => eggGroups.push(capitalized(element.name)));
        //this will iterate over the raw data on eggGroups for the specific pokemon we are iterating over and push just the eggGroups' names into our newly created array
        
        const pokemon = {
          name: capitalized(data1Array[i].name),
          id: data1Array[i].id,
          base_experience: data1Array[i].base_experience,
          types: types,
          weight: data1Array[i].weight,
          height: data1Array[i].height,
          habitat: capitalized(data2Array[i].habitat.name),
          growth_rate: capitalized(data2Array[i].growth_rate.name),
          evolution_chain: relevantEvolutionChain,
          sprites: {
            front_default: data1Array[i].sprites.front_default,
            back_default: data1Array[i].sprites.back_default,
            front_shiny: data1Array[i].sprites.front_shiny,
            back_shiny: data1Array[i].sprites.back_shiny,
            front_animated:
              data1Array[i].sprites.versions["generation-v"]["black-white"]
                .animated.front_default,
            back_animated:
              data1Array[i].sprites.versions["generation-v"]["black-white"]
                .animated.back_default,
          },
          egg_groups: eggGroups,
        };

        //still inside the 151x loop. 151 pokemon will be pushed into pokemonsArray
        pokemonsArray.push(pokemon);
      }
      pokemonSeed();
    });
  });
};

createPokemons();
