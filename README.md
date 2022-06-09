# Pokemon Tawny Port

IronHack Project 2 - [START YOUR ADVENTURE!](https://joaomiguelinacio.github.io/demon-slayer-dodging/)

![](./public/images/read-me-home-page.png)

## Introduction

Half way through Ironhack's Web Development Bootcamp learning remains as fun as ever.

This second project marks the end of module two, where we first learnt about Handlebars, Node and Express, Databases, such as MongoDB, and APIs.

The challenge was to create a simple website with 2 models and 1 relationship, all CRUD operations and full authentication and authorization processes.

## The Idea

The initial idea was indeed simple: Using the @[PokeAPI](https://pokeapi.co/), I would render some views with the Pokémon details, some other views with the user's details and I would allow users to catch Pokémon adding them to their Pokémon collection.

But it wasn't long until I faced my first challenge: to pick a color for my application name being that there are Pokémon games with the names of all the colors in the visible light spectrum already!

I had decided to use Pokémon from the first Generation only and those games were the versions RED and BLUE. Whilst playing with color mixers online, I got to TAWNY PORT.

After making a quick Google search to confirm that there wasn't a Pokémon TAWNY PORT game, my decision was made and I could finally move on to less important things.

![](./public/images/colors.png)

## ES modules

Speaking of Google searches, if you search for commonly used APIs, surely the PokeAPI will come up as one of them. Some authors will even refer to it as easy to use and begginer friendly so I thought I had hit the jackpot. 

During the bootcamp we had only used CommonJS module format but the @[PokeAPI](https://pokeapi.co/) is now pure ESM.

So, I wrote my thoughts on the search bar and there it was: those same thoughts in the title of an article @[What the heck is ESM?](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm#:~:text=ESM%20stands%20for%20ES%20Modules,import%20React%20from%20'react'%3B).

I had choosen a name for my app so there was no way I could go back on my choice for API - I quickly regretted this.

## The PokeApi

I believe everything I read on the Web and, after changing what looked like every single line of code from CJS to ESM, I was again holding on to the idea that The PokeApi was easy to use and begginer friendly.

The next day I realised that the info I wanted on the Pokémon was only obtainable using three different API methods and after days iterating through arrays, feeling a log more confident using the `map()`, `filter()` and `sort()` methods, I had an app that would take less than half an hour to render each view.

```javascript
  const pokemon = await MyPokedex.getPokemonByName(id);
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
    res.render('app/pokemon-details', {pokemon, pokemonSpecies} );
  } else {
    res.render('app/pokemon-details', {pokemon, pokemonSpecies, pokemonEvolutionChain} );
  }
```
    
```javascript
  const eggGroupPokemon = await MyPokedex.getEggGroupByName(id);
  const gen1Pokemon = await MyPokedex.getGenerationByName(1);
  const pokemonNamesInEggGroup = eggGroupPokemon.pokemon_species.map(pokemon => pokemon.name);
  const pokemonNamesInGen1 = gen1Pokemon.pokemon_species.map(pokemon => pokemon.name);
  const relevantPokemonNames = pokemonNamesInEggGroup.filter( name => pokemonNamesInGen1.indexOf(name) > -1);
  const pokemon = await MyPokedex.getPokemonByName(relevantPokemonNames);
```

## The Solution

Turns out seeding the database with data obtained using the API and using models made to measure, meeting all the data requirements my pages have, is not only much easier but it will also make the app much faster.

Come in, Mongo DB.

## The Fun Begins

I was finnaly ready to dive back in into the world of Pokémon! And now, so can you:

- Anonymous Users can see the Original Trainer Profile, my team, the Pokedex and each Pokémon details. 
- Anonymous Users can sing along the iconic Pokémon season 1 theme in their preferred languague.
- Anonymous Users can be transported back to the 90's when launching a random vs random Pokémon battle.
- Registered Users can catch Pokémon and build their own team, see who are the other trainers and see their teams.
- Registered Users can edit their profile and edit what Pokémon are on their team.

This is something I strongly advise them to do as Registered Users will also soon be able to choose one of the Pokémon in their team to battle random Pokémon and choose to battle other trainers on team of 6 vs team of 6 battles.

## Cool Stuff

- When signing up, if users don't upload any image, a Pokémon will be picked randomly to stand in for them.
- If the pokemon has been caught by the User previously, then the User can't catch it again.
- Users will see search suggestions after typing the second caracther in the search bar. No need to have to have Bulbapedia open on a different tab worrying about making a typo!
- Users can carry 6 Pokémon in their team. If trying to add a 7th Pokémon then another will be removed from their team.
- Users can see the Pokémon in their team and all their other Pokémon in the same page and they are not repeated. This is despite the fact that all one User's Team Pokémon are also in that one User's Pokémon list in the database. 
- Did I mention that this app was designed using a mobile first approach?
