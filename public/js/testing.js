const url = "https://pokeapi.co/api/v2/pokemon/1";
const https = require('https')

https.get(url, res => {
    let pokemonData = '';
    res.on('dataByPokemonUrl', chunk => {
        pokemonData += chunk;
    });
    res.on('end', () => {
        pokemonData = JSON.parse(pokemonData);
        console.log  (pokemonData);
        });
    });