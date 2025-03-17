let lang = 'cz';

function switchLanguage() {
    lang = lang === 'cz' ? 'en' : 'cz';

    document.getElementById("intro").innerText = lang === 'cz' ? 
        "Srdečně vás zveme na naši svatbu!" : 
        "We warmly invite you to our wedding!";
    
    document.getElementById("days-label").innerText = lang === 'cz' ? "Dní" : "Days";
    document.getElementById("hours-label").innerText = lang === 'cz' ? "Hodin" : "Hours";
    document.getElementById("minutes-label").innerText = lang === 'cz' ? "Minut" : "Minutes";
    document.getElementById("seconds-label").innerText = lang === 'cz' ? "Sekund" : "Seconds";
}

function updateCountdown() {
    const weddingDate = new Date("April 19, 2025 12:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        document.getElementById("days").innerText = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((timeLeft % (1000 * 60)) / 1000);
    }, 1000);
}

updateCountdown();
