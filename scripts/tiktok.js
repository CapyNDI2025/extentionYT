// scripts/tiktok.js

let tiktokSettings = {};

function cleanTikTok() {
    const path = window.location.pathname;

    // DETECTION INTELLIGENTE DE LA PAGE D'ACCUEIL
    // Matches: "/", "/fr/", "/en", "/foryou", "/fr/foryou"
    // Regex: Commence par / + optionnellement 2 lettres (langue) + optionnellement /foryou
    const isHomePage = path === '/' ||
        path.includes('/foryou') ||
        /^\/[a-z]{2}(-[a-z]{2})?\/?$/.test(path); // Detecte /fr/, /en-US/, etc.

    // --- 0. REDIRECTIONS (Zones Interdites) ---

    // Si on veut bloquer l'accueil (Pour toi) ET qu'on est sur une page d'accueil
    // Note: On ne redirige pas l'accueil vers l'accueil, sinon boucle infinie.
    // On laisse le blocage visuel (étape 1) s'en occuper.

    // Explorer
    if (tiktokSettings.hideTikTokExplore && (path.includes('/explore') || path.includes('/discover'))) {
        window.location.replace('/'); return;
    }
    // Suivi
    if (tiktokSettings.hideTikTokFollowing && (path.includes('/following') || path === '/following')) {
        window.location.replace('/'); return;
    }
    // Live
    if (tiktokSettings.hideTikTokLive && (path.includes('/live') || path === '/live')) {
        window.location.replace('/'); return;
    }
    // Activité
    if (tiktokSettings.hideTikTokActivity && (path.includes('/inbox') || path.includes('/notifications'))) {
        window.location.replace('/'); return;
    }
    // Friends
    if (tiktokSettings.hideTikTokFriends && (path.includes('/friends') || path === '/friends')) {
        window.location.replace('/'); return;
    }

    // --- 1. NETTOYAGE DU FLUX VIDÉO (Page d'accueil / Pour toi) ---

    if (tiktokSettings.hideTikTokForYou && isHomePage) {

        // A. Masquer les conteneurs identifiés
        const feedSelectors = [
            "[data-e2e='recommend-list-item-container']", // Carte vidéo
            "[data-e2e='feed-container']",                // Flux entier
            "[data-e2e='main-content-home']",             // Bloc principal (nouveau design)
            ".DivFeedContainer",
            "div[class*='DivItemContainer']"
        ];

        feedSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.style.setProperty('display', 'none', 'important');
            });
        });

        // B. Masquer brutalement toutes les vidéos
        document.querySelectorAll('video').forEach(video => {
            video.style.setProperty('display', 'none', 'important');
            video.muted = true;
            video.pause();

            // Masquer le parent direct pour éviter le cadre noir
            if (video.parentElement) {
                video.parentElement.style.setProperty('display', 'none', 'important');
            }
        });
    }

    // --- 2. SIDEBAR & NAVIGATION ---

    const hideByText = (selector, texts) => {
        document.querySelectorAll(selector).forEach(el => {
            // Vérifie si le texte contient un des mots interdits
            if (texts.some(t => el.textContent.trim().includes(t))) {
                el.style.setProperty('display', 'none', 'important');
            }
        });
    };

    // Pour toi
    if (tiktokSettings.hideTikTokForYou) {
        hideByText("a, div[role='button']", ["Pour toi", "For You"]);
        document.querySelectorAll("[data-e2e='nav-foryou'], [data-e2e='nav-home']").forEach(el => el.style.display = "none");
    }

    // Explore
    if (tiktokSettings.hideTikTokExplore) {
        hideByText("a, div[role='button']", ["Explorer", "Explore", "Découvrir"]);
        document.querySelectorAll("[data-e2e='nav-explore'], [data-e2e='nav-discover']").forEach(el => el.style.display = "none");
    }

    // Suivi
    if (tiktokSettings.hideTikTokFollowing) {
        hideByText("a, div[role='button']", ["Suivi", "Following", "Abonnements"]);
        document.querySelectorAll("[data-e2e='nav-following']").forEach(el => el.style.display = "none");
    }

    // Live
    if (tiktokSettings.hideTikTokLive) {
        hideByText("a, div[role='button']", ["LIVE", "Live"]);
        document.querySelectorAll("[data-e2e='nav-live']").forEach(el => el.style.display = "none");
        document.querySelectorAll(".live-badge").forEach(el => el.style.display = "none");
    }

    // Amis
    if (tiktokSettings.hideTikTokFriends) {
        hideByText("a, div[role='button']", ["Amis", "Friends"]);
        document.querySelectorAll("[data-e2e='nav-friends']").forEach(el => el.style.display = "none");
    }
}

// --- INITIALISATION ---

const keys = [
    "hideTikTokForYou",
    "hideTikTokExplore",
    "hideTikTokFollowing",
    "hideTikTokLive",
    "hideTikTokActivity",
    "hideTikTokFriends"
];

chrome.storage.sync.get(keys, (result) => {
    tiktokSettings = result;
    cleanTikTok();

    const tiktokObserver = new MutationObserver(cleanTikTok);
    tiktokObserver.observe(document.body, { childList: true, subtree: true });

    // Boucle de sécurité rapide
    setInterval(cleanTikTok, 400);
});

chrome.storage.onChanged.addListener((changes) => {
    for (const key in changes) {
        if (keys.includes(key)) {
            tiktokSettings[key] = changes[key].newValue;
        }
    }
    cleanTikTok();
});