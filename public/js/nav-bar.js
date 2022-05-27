function respNavBar () {
    let currentpage = window.location.pathname;
    console.log(currentpage);
    if (currentpage == "/app/original-trainer-pokedex" || currentpage == "/app/original-trainer-team") {
        document.getElementById("/app/original-trainer-profile").classList.add("active");
    } else if (currentpage !== "/" && currentpage !== "/auth/logout" && currentpage !== "/auth/login" && currentpage !== "/auth/signup") {
        document.getElementById(currentpage).classList.add("active");
    } else {
        console.log("CHECK nav-bar.js");
    }
}

respNavBar ();