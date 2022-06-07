window.onload = async () => {

  const generatePokemons = async () => {

    const teamDiv = document.getElementById("edit-team-team-div");
    const pokemonDiv = document.getElementById("edit-team-pokemon-div");
    const addPokemonsToTeamBtn = document.querySelectorAll(
      ".add-pokemon-to-team-btn"
    );
    const removePokemonsFromTeamBtn = document.querySelectorAll(
      ".remove-pokemon-from-team-btn"
    );

    addPokemonsToTeamBtn.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const id = event.currentTarget.children[0].innerHTML;
        await axios.post(`http://localhost:3000/app/own-pokemon-team-edit-add/${id}`);
        const response = await axios.get(
          "http://localhost:3000/app/own-pokemon-team-edit/json-list"
        );
        teamDiv.innerHTML = "";
        pokemonDiv.innerHTMl = "";
        response.data[0].forEach((pokemon) => {
          teamDiv.innerHTML += 
          `
          <div class="row edit-team-body">
            <div class="col">
                <img src="${pokemon.sprites.front_default}" alt="https://res.cloudinary.com/dvru7nv6q/image/upload/v1654107302/pokemon-tawny-port/pokeball-png-45332_rarrzq.png">
            </div>
            <div class="col">
                <a>${pokemon.name} #${pokemon.id} CREATED WITH DOM</a>
            </div>
            <div class="col">
              <button type="submit "class="remove-pokemon-from-team-btn"><span class="hidden">${pokemon.id}</span></button>
            </div>
          </div>
          `;
        });
        response.data[1].forEach((pokemon) => {
          pokemonDiv.innerHTML += 
          `
          <div class="row edit-team-body">
            <div class="col">
                <img src="${pokemon.sprites.front_default}" alt="https://res.cloudinary.com/dvru7nv6q/image/upload/v1654107302/pokemon-tawny-port/pokeball-png-45332_rarrzq.png">
            </div>
            <div class="col">
                <a>${pokemon.name} #${pokemon.id} CREATED WITH DOM</a>
            </div>
            <div class="col">
                <button type="submit "class="add-pokemon-to-team-btn"><span class="hidden">${pokemon.id}</span></button>
            </div>
          </div>
          `;
        });
      });
    });
    removePokemonsFromTeamBtn.forEach((button) => {
      button.addEventListener("click", async (event) => {
        console.log(event.currentTarget.children[0].innerHTML);
        const id = event.currentTarget.children[0].innerHTML;
        await axios.post(`http://localhost:3000/app/own-pokemon-team-edit-remove/${id}`)
        const response = await axios.get(
          "http://localhost:3000/app/own-pokemon-team-edit/json-list"
        );
        teamDiv.innerHTML = "";
        pokemonDiv.innerHTMl = "";
        response.data[0].forEach((pokemon) => {
          teamDiv.innerHTML += 
          `
          <div class="row edit-team-body">
            <div class="col">
                <img src="${pokemon.sprites.front_default}" alt="https://res.cloudinary.com/dvru7nv6q/image/upload/v1654107302/pokemon-tawny-port/pokeball-png-45332_rarrzq.png">
            </div>
            <div class="col">
                <a>${pokemon.name} #${pokemon.id} CREATED WITH DOM</a>
            </div>
            <div class="col">
              <button type="submit "class="remove-pokemon-from-team-btn"><span class="hidden">${pokemon.id}</span></button>
            </div>
          </div>
          `;
        });
        response.data[1].forEach((pokemon) => {
          pokemonDiv.innerHTML += 
          `
          <div class="row edit-team-body">
            <div class="col">
                <img src="${pokemon.sprites.front_default}" alt="https://res.cloudinary.com/dvru7nv6q/image/upload/v1654107302/pokemon-tawny-port/pokeball-png-45332_rarrzq.png">
            </div>
            <div class="col">
                <a>${pokemon.name} #${pokemon.id}  CREATED WITH DOM</a>
            </div>
            <div class="col">
                <button type="submit "class="add-pokemon-to-team-btn"><span class="hidden">${pokemon.id}</span></button>
            </div>
          </div>
          `;
        });
        generatePokemons();
      });
    });
  };
  generatePokemons();
};