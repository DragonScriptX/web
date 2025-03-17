let currentLang = "cs";

// Funkce pro načtení JSON souborů s texty a daty
async function loadContent() {
    try {
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

        // Načtení map – Kontrola, zda existují
        if (data.pobezovice && data.pobezovice.map) {
            document.getElementById("pobezovice-map").src = data.pobezovice.map;
        } else {
            console.error("Chyba: Mapový odkaz pro Poběžovice nebyl nalezen.");
        }

        if (data.chalupa && data.chalupa.map) {
            document.getElementById("chalupa-map").src = data.chalupa.map;
        } else {
            console.error("Chyba: Mapový odkaz pro Chalupu nebyl nalezen.");
        }

        // Načtení obrázků – Kontrola, zda existují
        loadImages("pobezovice-gallery", data.pobezovice.images);
        loadImages("chalupa-gallery", data.chalupa.images);

    } catch (error) {
        console.error("Chyba při načítání souborů:", error);
    }
}

// Funkce pro načtení obrázků do galerie
function loadImages(elementId, images) {
    const gallery = document.getElementById(elementId);
    gallery.innerHTML = "";

    if (images && images.length > 0) {
        images.forEach(imgSrc => {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = "Obrázek";
            gallery.appendChild(img);
        });
    } else {
        console.error(`Chyba: Obrázky pro sekci ${elementId} nebyly nalezeny.`);
    }
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
