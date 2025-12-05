// instagram.js

let instaSettings = {};

function cleanInstagram() {
    const path = window.location.pathname;

    // LOGIQUE DE DÉPENDANCE :
    // Si on masque les posts (hideInstaPosts), on doit FORCÉMENT bloquer Explore.
    // Donc on crée une variable combinée :
    const shouldBlockExplore = instaSettings.hideInstaExplore || instaSettings.hideInstaPosts;

    // --- 0. REDIRECTIONS ---

    if (instaSettings.hideInstaReels && path.includes('/reels/')) {
        window.location.replace('/');
        return;
    }

    // On utilise la nouvelle variable combinée ici
    if (shouldBlockExplore && path.includes('/explore/')) {
        window.location.replace('/');
        return;
    }

    // --- 1. NAVIGATION & MENUS ---

    // A. REELS
    if (instaSettings.hideInstaReels) {
        const reelSelectors = [
            "a[href^='/reels/']",
            "a[href*='/reels/']",
            "div[role='button']:has(svg[aria-label='Reels'])"
        ];
        reelSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => el.style.display = "none");
        });
    }

    // B. EXPLORE (DÉCOUVRIR) - On utilise shouldBlockExplore
    if (shouldBlockExplore) {
        const exploreSelectors = [
            "a[href^='/explore/']",
            "a[href*='/explore/']"
        ];
        exploreSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => el.style.display = "none");
        });
    }

    // C. NOTIFICATIONS
    if (instaSettings.hideInstaNotifications) {
        document.querySelectorAll('svg[aria-label="Notifications"]').forEach(icon => {
            const parent = icon.closest('a') || icon.closest('div[role="button"]');
            if (parent) parent.style.display = "none";
        });
        document.querySelectorAll('span').forEach(span => {
            if (span.textContent.trim() === 'Notifications') {
                const parent = span.closest('a') || span.closest('div[role="button"]');
                if (parent) parent.style.display = "none";
            }
        });
    }

    // --- 2. STORIES ---
    if (instaSettings.hideInstaStories) {
        document.querySelectorAll('div[data-pagelet="story_tray"]').forEach(tray => {
            tray.style.display = "none";
        });
    }

    // --- 3. CONTENU DES POSTS ---
    if (instaSettings.hideInstaPosts) {
        const articles = document.querySelectorAll('article');

        articles.forEach(article => {
            const mediaContainers = article.querySelectorAll('div[role="button"][tabindex="0"], ._aagv, ._aagu');
            mediaContainers.forEach(container => {
                if (container.querySelector('img') || container.querySelector('video')) {
                    container.style.display = "none";
                }
            });

            const mediaElements = article.querySelectorAll('img, video');
            mediaElements.forEach(media => {
                if (media.clientWidth > 150) {
                    if(media.parentElement) {
                        media.parentElement.style.display = "none";
                    }
                }
            });
        });
    }
}

// Initialisation
const keys = [
    "hideInstaReels",
    "hideInstaExplore",
    "hideInstaStories",
    "hideInstaPosts",
    "hideInstaNotifications"
];

chrome.storage.sync.get(keys, (result) => {
    instaSettings = result;
    cleanInstagram();
    const instaObserver = new MutationObserver(cleanInstagram);
    instaObserver.observe(document.body, { childList: true, subtree: true });
});

chrome.storage.onChanged.addListener((changes) => {
    for (const key in changes) {
        if (keys.includes(key)) {
            instaSettings[key] = changes[key].newValue;
        }
    }
    cleanInstagram();
});