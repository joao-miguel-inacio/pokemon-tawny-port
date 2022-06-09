    const battleBtn =  document.getElementById("battle-btn");
    battleBtn.addEventListener("click", function() {
    try{
        battleBtn.classList.add("hidden");
        document.getElementById("pokemon1").classList.add("hidden");
        document.getElementById("pokemon2").classList.add("hidden");
        document.getElementById("winner-image").classList.remove("hidden");
        document.getElementById("winner-text1").classList.remove("hidden");
        document.getElementById("winner-text2").classList.remove("hidden");
    } catch {
        document.getElementById("vibrating-plate").classList.add("hidden");
        document.getElementById("pokemon1").classList.add("hidden");
        document.getElementById("pokemon2").classList.add("hidden");
        document.getElementById("draw-text1").classList.remove("hidden");
        document.getElementById("draw-text2").classList.remove("hidden");
    }
});
