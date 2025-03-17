let currentLang = "cs";

// Funkce pro načtení souborů do stránky
function loadSection(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(error => console.error(`Chyba při načítání ${file}:`, error));
}

// Načítání všech sekcí
document.addEventListener("DOMContentLoaded", function() {
    loadSection("header", "header.html");
    loadSection("countdown", "countdown.html");
    loadSection("pobezovice", "pobezovice.html");
    loadSection("chalupa", "chalupa.html");
    loadSection("footer", "footer.html");

    loadText();
});

// Funkce pro načtení textů
async function loadText() {
    const response = await fetch("text.json");
    const texts = await response.json();

    document.getElementById("page-title").innerText = texts[currentLang].title;
    document.getElementById("invitation-text").innerText = texts[currentLang].invitation;

    document.getElementById("days-label").innerText = texts[currentLang].countdown_days;
    document.getElementById("hours-label").innerText = texts[currentLang].countdown_hours;
    document.getElementById("minutes-label").innerText = texts[currentLang].countdown_minutes;
    document.getElementById("seconds-label").innerText = texts[currentLang].countdown_seconds;
}

// Přepínání jazyků
function switchLanguage() {
    currentLang = currentLang === "cs" ? "en" : "cs";
    loadText();
}
