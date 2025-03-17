let currentLang = "cs"; // Výchozí jazyk

// Funkce pro načtení souborů do stránky
function loadSection(id, file, callback = null) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error(`Chyba při načítání ${file}:`, error));
}

// Načítání sekcí při spuštění
document.addEventListener("DOMContentLoaded", function () {
    loadSection("header", "header.html");
    loadSection("countdown", "countdown.html", startCountdown);
    loadSection("pobezovice", "pobezovice.html", loadData);
    loadSection("chalupa", "chalupa.html", loadData);
    loadSection("footer", "footer.html");

    loadText();
});

// Funkce pro načtení textů ze `text.json`
async function loadText() {
    try {
        const response = await fetch("text.json");
        const texts = await response.json();

        document.getElementById("page-title").innerText = texts[currentLang].title;
        document.getElementById("invitation-text").innerText = texts[currentLang].invitation;

        document.getElementById("days-label").innerText = texts[currentLang].countdown_days;
        document.getElementById("hours-label").innerText = texts[currentLang].countdown_hours;
        document.getElementById("minutes-label").innerText = texts[currentLang].countdown_minutes;
        document.getElementById("seconds-label").innerText = texts[currentLang].countdown_seconds;

        document.getElementById("pobezovice-title").innerText = texts[currentLang].pobezovice_title;
        document.getElementById("pobezovice-address").innerText = texts[currentLang].pobezovice_address;
        document.getElementById("pobezovice-description").innerText = texts[currentLang].pobezovice_description;

        document.getElementById("chalupa-title").innerText = texts[currentLang].chalupa_title;
        document.getElementById("chalupa-address").innerText = texts[currentLang].chalupa_address;
        document.getElementById("chalupa-description").innerText = texts[currentLang].chalupa_description;

    } catch (error) {
        console.error("Chyba při načítání `text.json`:", error);
    }
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

// Funkce pro načítání map a obrázků z `data.json`
async function loadData() {
    try {
        const response = await fetch("data.json");
        const data = await response.json();

        // Poběžovice
        if (document.getElementById("pobezovice-map") && data.pobezovice) {
            document.getElementById("pobezovice-map").src = data.pobezovice.map;
        }
        if (document.getElementById("pobezovice-gallery") && data.pobezovice.images.length > 0) {
            loadImages("pobezovice-gallery", data.pobezovice.images);
        }

        // Chodská Chalupa
        if (document.getElementById("chalupa-map") && data.chalupa) {
            document.getElementById("chalupa-map").src = data.chalupa.map;
        }
        if (document.getElementById("chalupa-gallery") && data.chalupa.images.length > 0) {
            loadImages("chalupa-gallery", data.chalupa.images);
        }

    } catch (error) {
        console.error("Chyba při načítání `data.json`:", error);
    }
}

// Funkce pro načtení obrázků do galerie
function loadImages(elementId, images) {
    const gallery = document.getElementById(elementId);
    gallery.innerHTML = "";

    images.forEach(imgSrc => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "Obrázek";
        gallery.appendChild(img);
    });
}
