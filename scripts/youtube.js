let ytSettings = {};

function cleanYouTube() {
    if (ytSettings.hideHomepage) {
        const homeSelectors = [
            "ytd-browse[page-subtype='home']",
            "#page-manager > ytd-browse[page-subtype='home']"
        ];
        homeSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => el.style.display = "none");
        });
    }

    // --- GESTION DES SHORTS ---
    if (ytSettings.hideShorts) {
        const shortsSelectors = [
            // Menu latéral
            "ytd-mini-guide-entry-renderer[aria-label='Shorts']",
            "ytd-guide-entry-renderer:has(a[title='Shorts'])",
            "a[title='Shorts']",

            // Rayons sur la page d'accueil / résultats
            "ytd-reel-shelf-renderer",
            "ytd-rich-shelf-renderer[is-shorts]",

            // Onglet Shorts dans les chaînes
            "yt-tab-shape[tab-title='Shorts']",

            // Liens vidéos
            "a[href^='/shorts/']"
        ];

        shortsSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => el.style.display = "none");
        });
    }

    // --- GESTION DE LA BARRE LATÉRALE (Suggestions) ---
    if (ytSettings.hideSidebar) {
        const sidebarSelectors = [
            "#secondary", // La colonne de droite entière
            "ytd-watch-next-secondary-results-renderer" // Les vidéos suggérées spécifiquement
        ];
        sidebarSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => el.style.display = "none");
        });
    }

    // --- GESTION DES COMMENTAIRES ---
    if (ytSettings.hideComments) {
        const commentSelectors = [
            "#comments",
            "ytd-comments"
        ];
        commentSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => el.style.display = "none");
        });
    }
}

// --- INITIALISATION ---

const keys = [
    "hideHomepage",
    "hideShorts",
    "hideSidebar",
    "hideComments"
];

// Récupérer les options au chargement
chrome.storage.sync.get(keys, (result) => {
    ytSettings = result;

    cleanYouTube();

    const ytObserver = new MutationObserver(cleanYouTube);
    ytObserver.observe(document.body, { childList: true, subtree: true });
});

// Écouter les changements de paramètres en direct
chrome.storage.onChanged.addListener((changes) => {
    for (const key in changes) {
        if (keys.includes(key)) {
            ytSettings[key] = changes[key].newValue;
        }
    }
    cleanYouTube();
});