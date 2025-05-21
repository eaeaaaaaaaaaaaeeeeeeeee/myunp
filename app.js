const socket = new WebSocket("ws://127.0.0.1:24050/ws");

// DOM elements
const $ = s => document.querySelector(s);
const titleElem = $(".map-title");
const title2Elem = $(".map-title2");
const artistElem = $(".map-artist");
const creatorElem = $(".map-creator");
const albumArt = $(".album-art");
const albumArtBlur = $(".album-art-blur");
const currentTimeElem = $(".time-current");
const totalTimeElem = $(".time-total");
const progressBar = $(".progress-bar");
const nowPP = $(".pp-display .pp-value");
const fcPP = $(".pp-display.fc .pp-value");
const taikoIndicator = $(".mode-indicator.taiko");
const maniaIndicator = $(".mode-indicator.mania");

// Utilities
const formatTime = ms => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
};

let lastMapId = null;

function animateChange(element, animationClass = "np-animate") {
    element.classList.remove(animationClass);
    // Force reflow to restart animation
    void element.offsetWidth;
    element.classList.add(animationClass);
}

socket.addEventListener("message", ({ data }) => {
    const d = JSON.parse(data);
    const bm = d.menu?.bm;
    const meta = bm?.metadata;
    const time = bm?.time;
    if (!bm || !meta || !time) return;

    // Only update if beatmap changed
    if (bm.id !== lastMapId) {
        lastMapId = bm.id;

        // Animate metadata changes
        animateChange(titleElem);
        animateChange(title2Elem, "np-animate-title2");
        animateChange(artistElem);
        animateChange(creatorElem);

        titleElem.textContent = meta.title || "Unknown Title";
        title2Elem.textContent = meta.title || "";
        artistElem.textContent = meta.artist || "Unknown Artist";
        creatorElem.textContent = `Mapped by ${meta.mapper || "Unknown"}`;

        // Animate album art
        animateChange(albumArt, "np-img-animate");
        animateChange(albumArtBlur, "np-img-animate");

        // Fade in album art
        const url = `https://assets.ppy.sh/beatmaps/${bm.set}/covers/cover.jpg`;
        albumArt.style.opacity = 0;
        albumArtBlur.style.opacity = 0;
        const img = new Image();
        img.onload = () => {
            albumArt.style.backgroundImage = `url(${url})`;
            albumArtBlur.style.backgroundImage = `url(${url})`;
            requestAnimationFrame(() => {
                albumArt.style.opacity = 1;
                albumArtBlur.style.opacity = 1; 
            });
        };
        img.src = url;
    }

    // Time and progress bar
    let current = time.current - time.firstObj;
    const full = time.full - time.firstObj;
    if (current > full) current = full; 
    
    const progress = Math.min(1, Math.max(0, current / full));
    currentTimeElem.textContent = formatTime(current);
    totalTimeElem.textContent = formatTime(full);
    progressBar.style.width = `${progress * 100}%`;
    
    // PP display
    nowPP.textContent = `${Math.round(d.gameplay?.pp?.current || 0)}pp`;
    fcPP.textContent = `${Math.round(d.gameplay?.pp?.fc || 0)}pp`;

    // Mode indicator
    const mode = d.menu?.gameMode;
    taikoIndicator.classList.remove("active");
    maniaIndicator.classList.remove("active");
    if (mode === 1) {
        taikoIndicator.classList.add("active");
    } else if (mode === 3) {
        maniaIndicator.classList.add("active");
    }
});