let randomImgBtn = document.getElementById("random-image-generator-button"),
    randomTxtBtn = document.getElementById("random-text-generator-button"),
    imageInputEle = document.getElementById("profile-creation-image"),
    textInputEle = document.getElementById("profile-creation-description");


const assignImage = async () => {
    const pokemonID = Math.floor(Math.random() * 151);
    const pokemon = await Pokemon.find( {id:pokemonID});
    const pokemonImg = pokemon[0].sprites.front_animated;
    imageInputEle.innerHTML = `${pokemonImg}`;
};

randomImgBtn.addEventListener("click", assignImage());

const assignDescription = () => {
    textInputEle.innerHTM="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam suscipit elementum tortor eget tincidunt. Suspendisse vel efficitur tortor, non finibus massa. Maecenas semper eros arcu, et mollis nibh pretium ac. Quisque volutpat ipsum non volutpat egestas. Pellentesque ornare sollicitudin massa vitae laoreet. Cras in auctor eros. Aenean a risus in."
};

randomTxtBtn.addEventListener("click", assignDescription());