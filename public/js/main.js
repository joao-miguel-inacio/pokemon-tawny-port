function  pokemonHatcher () {
    console.log("inside handleGetJson");

    const apiData = {
        url: "https://pokeapi.co/api/v2/",
        type: "pokemon",
        id: "name"
    };
    const {url, type, id} = apiData;
    for (let id =1 ; id<= 151; id++){
        const dataByPokemon = `${url}${type}/${id}`;
        fetch(dataByPokemon)
        .then((response) => response.json())
        .then((pokemon) =>  {
            console.log(pokemon)
            return pokemon
        });
        }
}

pokemonHatcher ();