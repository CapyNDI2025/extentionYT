// content.js

function cleanYouTube() {
    const selectors = [
        "#comments",                 // commentaires
        "ytd-merch-shelf-renderer",  // merch
        "ytd-browse[page-subtype='home']",  // feed page d'accueil
        "ytd-watch-next-secondary-results-renderer", // suggestions à droite
        "ytd-reel-shelf-renderer"   // shorts
    ];

    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.remove());
    });
}

// YouTube charge en dynamique → il faut observer les changements
const observer = new MutationObserver(cleanYouTube);
observer.observe(document.body, { childList: true, subtree: true });

cleanYouTube();