let currentLang = "cs";

// Funkce pro načtení souborů do stránky
function loadSection(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (id === "countdown") {
                startCountdown(); // Spuštění odpočítávání po načtení sekce
            }
        })
        .catch(error => console.error(`Chyba při načítání ${file}:`, error));
}

// Načítání všech sekcí při startu
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

// Funkce pro odpočítávání času do svatby
function startCountdown() {
    const weddingDate = new Date("April 19, 2025 12:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        if (document.getElementById("days")) {
            document.getElementById("days").innerText = days;
            document.getElementById("hours").innerText = hours;
            document.getElementById("minutes").innerText = minutes;
            document.getElementById("seconds").innerText = seconds;
        }
    }, 1000);
}
