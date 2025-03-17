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
    function update() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
    }
    setInterval(update, 1000);
    update();
}

updateCountdown();
