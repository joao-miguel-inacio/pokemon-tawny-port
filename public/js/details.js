function respTypes () {
    const typeElement = document.getElementsByClassName("pokemon-details-types");
    for (let element of typeElement) {
        const type = element.innerHTML;
        if (type === "Bug"){
            element.style.backgroundColor = "A6B91A";
        } 
        if (type === "Dragon"){
            element.style.backgroundColor = "6F35FC";
        } 
        if (type === "Electric"){
            element.style.backgroundColor = "F7D02C";
        } 
        if (type === "Fighting"){
            element.style.backgroundColor = "C22E28";
        } 
        if (type === "Fire"){
            element.style.backgroundColor = "EE8130";
        } 
        if (type === "Flying"){
            element.style.backgroundColor = "A98FF3";
        } 
        if (type === "Ghost"){
            element.style.backgroundColor = "735797";
        } 
        if (type === "Grass"){
            element.style.backgroundColor = "7AC74C";
        } 
        if (type === "Ground"){
            element.style.backgroundColor = "E2BF65";
        } 
        if (type === "Ice"){
            element.style.backgroundColor = "96D9D6";
        } 
        if (type === "Normal"){
            element.style.backgroundColor = "A8A77A";
        } 
        if (type === "Poison"){
            element.style.backgroundColor = "A33EA1";
        } 
        if (type === "Psychic"){
            element.style.backgroundColor = "F95587";
        } 
        if (type === "Rock"){
            element.style.backgroundColor = "B6A136";
        } 
        if (type === "Water"){
            element.style.backgroundColor = "6390F0";
        }
        if (type === "Fairy"){
            element.style.backgroundColor = "pink";
        }
    }   
}

respTypes ()