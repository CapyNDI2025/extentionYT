// Applique les préférences dès qu'elles changent
chrome.storage.sync.onChanged.addListener(applyPreferences);

// Charge les préférences au démarrage
chrome.storage.sync.get(null, prefs => {
    applyPreferences(prefs);
});

function applyPreferences(prefs) {
    if (prefs.hideShorts || prefs.hideShorts?.newValue) {
        enableHideShorts();
    }
}

// --- Masquage des Shorts dans la homepage, sidebar, recherche ---

function hideShortsElements() {
    const selectors = [
        "ytd-reel-shelf-renderer",
        "ytd-rich-item-renderer a[href*='/shorts/']",
        "a[href^='/shorts/']"
    ];

    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.style.display = "none";
        });
    });
}

let shortsObserver = null;

function enableHideShorts() {
    // Exécute une première fois
    hideShortsElements();

    // Évite de créer plusieurs observers
    if (shortsObserver) return;

    shortsObserver = new MutationObserver(() => hideShortsElements());
    shortsObserver.observe(document.body, { childList: true, subtree: true });
}

const hideShorts = () => {
    // Tous les sélecteurs Shorts connus
    const selectors = [
        "ytd-reel-shelf-renderer",
        "ytd-rich-shelf-renderer[is-shorts]",
        "a[href*='/shorts']",
        "ytd-mini-guide-entry-renderer[aria-label='Shorts']",
        "ytd-guide-entry-renderer a[href*='/shorts']",
        "ytd-thumbnail-overlay-time-status-renderer[overlay-style='SHORTS']",
    ];

    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.style.display = "none";
            el.remove();
        });
    });
};

// Relancer en boucle car YouTube recharge du HTML toutes les 200 ms
setInterval(hideShorts, 500);
