let currentLang = "cs";

// Funkce pro načtení JSON souborů s texty a daty
async function loadContent() {
    const textResponse = await fetch("text.json");
    const texts = await textResponse.json();

    const dataResponse = await fetch("data.json");
    const data = await dataResponse.json();

    // Aktualizace textů
    document.getElementById("title").innerText = texts[currentLang].title;
    document.getElementById("page-title").innerText = texts[currentLang].title;
    document.getElementById("invitation-text").innerText = texts[currentLang].invitation;

    document.getElementById("days-label").innerText = texts[currentLang].countdown_days;
    document.getElementById("hours-label").innerText = texts[currentLang].countdown_hours;
    document.getElementById("minutes-label").innerText = texts[currentLang].countdown_minutes;
    document.getElementById("seconds-label").innerText = texts[currentLang].countdown_seconds;

    document.getElementById("pobezovice-title").innerText = texts[currentLang].pobezovice_title;
    document.getElementById("pobezovice-address").innerText = texts[currentLang].pobezovice_address;

    document.getElementById("chalupa-title").innerText = texts[currentLang].chalupa_title;
    document.getElementById("chalupa-address").innerText = texts[currentLang].chalupa_address;

    // Načtení map
    document.getElementById("pobezovice-map").src = data.pobezovice.map;
    document.getElementById("chalupa-map").src = data.chalupa.map;

    // Načtení obrázků
    loadImages("pobezovice-gallery", data.pobezovice.images);
    loadImages("chalupa-gallery", data.chalupa.images);
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

// Přepínač jazyků
function switchLanguage() {
    currentLang = currentLang === "cs" ? "en" : "cs";
    loadContent();
}

// Načtení textů, map a obrázků při načtení stránky
document.addEventListener("DOMContentLoaded", function() {
    loadContent();
});
