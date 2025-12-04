// Sélecteurs des éléments à masquer
const ZENTUBE_SELECTORS = {
    hideComments: "#comments",
    hideSidebar: "ytd-watch-next-secondary-results-renderer",
    hideShorts: "ytd-reel-shelf-renderer",
    hideHomepage: "ytd-browse[page-subtype='home']"
};

let settings = {};

// Applique le nettoyage selon les réglages
function cleanYouTube() {
    for (const [key, selector] of Object.entries(ZENTUBE_SELECTORS)) {
        if (settings[key]) {
            document.querySelectorAll(selector).forEach(el => el.remove());
        }
    }
}

// Récupère les préférences au démarrage
chrome.storage.sync.get(Object.keys(ZENTUBE_SELECTORS), result => {
    settings = result;
    cleanYouTube();
});

// Re-applique à chaque modification de DOM (YouTube recharge dynamiquement)
const observer = new MutationObserver(cleanYouTube);
observer.observe(document.body, { childList: true, subtree: true });

// Met à jour si l'utilisateur change un réglage
chrome.storage.onChanged.addListener((changes) => {
    for (const key in changes) {
        settings[key] = changes[key].newValue;
    }
    cleanYouTube();
});