function respNavBar() {
  let currentpage = window.location.pathname;
  console.log(currentpage);
  if (currentpage === "/app/trainer-list"){
    document.body.style.background = "url('https://res.cloudinary.com/dvru7nv6q/image/upload/v1654716614/pokemon-tawny-port/20998_1_pjufvv_pr16kl.jpg')";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";
    document.getElementById("/app/trainer").classList.add("active");

  } else if (currentpage === "/app/own-pokemon-team-edit"){
    document.body.style.background = "url('https://res.cloudinary.com/dvru7nv6q/image/upload/v1654716614/pokemon-tawny-port/20998_1_pjufvv_pr16kl.jpg')";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";
    document.body.style.color = "white";
    document.getElementById("/app/own-profile").classList.add("active");

  } else if (currentpage === "/app/own-profile-edit"){
    document.body.style.background = "url('https://res.cloudinary.com/dvru7nv6q/image/upload/v1654716614/pokemon-tawny-port/20998_1_pjufvv_pr16kl.jpg')";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";
    document.body.style.color = "white";
    document.getElementById("/app/own-profile").classList.add("active");

  } else if (currentpage.includes("/app/own")) {
    document.getElementById("/app/own-profile").classList.add("active");

  } else if (currentpage.includes("/app/battle")) {
    document.getElementById("/app/battle").classList.add("active");

  } else if (currentpage.includes("/app/trainer")) {
    document.getElementById("/app/trainer").classList.add("active");

  } else if (currentpage.includes("/app/original")) {
    document.getElementById("/app/original-trainer-profile").classList.add("active");

  } else if (currentpage.includes("/app/pokemon")) {
    document.body.style.background = "url('https://res.cloudinary.com/dvru7nv6q/image/upload/v1654716614/pokemon-tawny-port/20998_1_pjufvv_pr16kl.jpg')";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";
    document.body.style.color = "white";
    document.getElementById("/app/pokedex").classList.add("active");

  } else if (currentpage.includes("/app/pokedex")) {
    document.getElementById("/app/pokedex").classList.add("active");
    document.body.style.backgroundPosition = "0";

  } else if (currentpage.includes("/app/pokemon-search")) {
    document.getElementById("psyduck-image").classList.remove("hidden");

  } else if (currentpage.includes("/auth")) {
    document.body.style.color = "white";
    document.body.style.background = "url('https://res.cloudinary.com/dvru7nv6q/image/upload/v1654716614/pokemon-tawny-port/20998_1_pjufvv_pr16kl.jpg')";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";
    if(document.getElementById("passwordHelpBlock")){
      document.getElementById("passwordHelpBlock").style.color = "white";
    }
  }
}

respNavBar();
