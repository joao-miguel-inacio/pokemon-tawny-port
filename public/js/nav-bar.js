function respNavBar () {
    let currentpage = window.location.pathname;
    console.log(currentpage);
    if (currentpage.includes("/app/pokemon-search")){
        document.getElementById("psyduck-image").classList.remove("hidden");
    } else if (currentpage.includes("/app/original")){
        document.getElementById("/app/original-trainer-profile").classList.add("active");
    } else if (currentpage.includes("/app/pokemon")) {
        document.getElementById("/app/pokedex").classList.add("active");
    } else if (currentpage !== "/" && currentpage !== "/auth/logout" && currentpage !== "/auth/login" && currentpage !== "/auth/signup") {
        document.getElementById(currentpage).classList.add("active");
    } else {
        console.log("CHECK nav-bar.js");
    }
}

respNavBar ();