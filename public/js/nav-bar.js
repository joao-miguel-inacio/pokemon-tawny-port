function respNavBar () {
    let currentpage = window.location.pathname;
    if (currentpage !== "/" && currentpage !== "/auth/logout" && currentpage !== "/auth/login" && currentpage !== "/auth/signup") {
    document.getElementById(currentpage).classList.add("active");
    }
}

respNavBar ();
