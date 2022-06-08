function respNavBar() {
  let currentpage = window.location.pathname;
  console.log(currentpage);
  if (
    currentpage.includes("/app/own")) {
    document.getElementById("/app/own-profile").classList.add("active");

  } else if (currentpage.includes("/app/trainer")) {
    document.getElementById("/app/trainer").classList.add("active");

  } else if (currentpage.includes("/app/original")) {
    document.getElementById("/app/original-trainer-profile").classList.add("active");

  } else if (currentpage.includes("/app/pokemon")) {
    document.getElementById("/app/pokedex").classList.add("active");

  } else if (currentpage.includes("/app/pokedex")) {
    document.getElementById("/app/pokedex").classList.add("active");
  
  } else if (currentpage.includes("/app/pokemon-search")) {
    document.getElementById("psyduck-image").classList.remove("hidden");

  } else {
    console.log("CHECK nav-bar.js");
  }
}

respNavBar();
