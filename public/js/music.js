const GBBtn =  document.getElementById("GB-flag");
const EsBtn =  document.getElementById("Es-flag");
const PtBtn =  document.getElementById("Pt-flag");
const FrBtn  =  document.getElementById("Fr-flag");
const JpnBtn =  document.getElementById("Jpn-flag");

audioElement = new Audio('https://res.cloudinary.com/dvru7nv6q/video/upload/v1654772010/pokemon-tawny-port/Y2Mate.is_-_Pok%C3%A9mon_Theme_Song_Music_Video_-rg6CiPI6h2g-160k-1654162516340_hflxz2.mp3');

GBBtn.addEventListener("click", function() {
    audioElement.pause();
    audioElement = new Audio('https://res.cloudinary.com/dvru7nv6q/video/upload/v1654772010/pokemon-tawny-port/Y2Mate.is_-_Pok%C3%A9mon_Theme_Song_Music_Video_-rg6CiPI6h2g-160k-1654162516340_hflxz2.mp3');
    audioElement.volume = 0.2;
    audioElement.play();
});

EsBtn.addEventListener("click", function() {
    audioElement.pause();
    audioElement = new Audio('https://res.cloudinary.com/dvru7nv6q/video/upload/v1654771726/pokemon-tawny-port/Y2Mate.is_-_Pokemon_-_La_Cancion_De_Pokemon_Espa%C3%B1ol_Espa%C3%B1a_-t8HkV906ODw-160k-1654771701373_rwdkjd.mp3');
    audioElement.volume = 0.2;
    audioElement.play();
});

PtBtn.addEventListener("click", function() {
    audioElement.pause();
    audioElement = new Audio('https://res.cloudinary.com/dvru7nv6q/video/upload/v1654771826/pokemon-tawny-port/Y2Mate.is_-_Abertura_Pokemon_Andr%C3%A9_Maia_Portugal_720p_-Qlbz1UZphTw-128k-1654771807506_ldfjqy.mp3');
    audioElement.volume = 0.8;
    audioElement.play();
});

FrBtn.addEventListener("click", function() {
    audioElement.pause();
    audioElement = new Audio('https://res.cloudinary.com/dvru7nv6q/video/upload/v1654771882/pokemon-tawny-port/Y2Mate.is_-_Pokemon_Theme_Song_In_French-7jMtPauG2qA-160k-1654771863256_vqi2ch.mp3');
    audioElement.volume = 0.4;
    audioElement.play();
});

JpnBtn.addEventListener("click", function() {
    audioElement.pause();
    audioElement = new Audio('https://res.cloudinary.com/dvru7nv6q/video/upload/v1654772093/pokemon-tawny-port/Y2Mate.is_-_Pocket_Monsters_-_OP_1_-_Aim_to_Be_a_Pok%C3%A9mon_Master-d-lEahV5Q_o-160k-1654772079103_unaatk.mp3');
    audioElement.volume = 0.7;
    audioElement.play();
});
