// instagram.js

function cleanInstagram() {
    // Sélecteurs pour cibler les Reels
    const selectors = [
        "a[href^='/reels/']",         // Icône Reels barre de gauche/bas
        "a[href*='/reels/']",         // Liens vers des reels dans le feed
        "div[role='button']:has(svg[aria-label='Reels'])", // Boutons techniques Reels
        "li:has(a[href^='/reels/'])"  // L'élément de liste contenant le lien (pour éviter les trous vides)
    ];

    selectors.forEach(sel => {
        const elements = document.querySelectorAll(sel);
        elements.forEach(el => {
            // On cache l'élément au lieu de le supprimer pour éviter les crashs
            el.style.display = "none";
        });
    });
}

// Observer pour Instagram
const instaObserver = new MutationObserver(cleanInstagram);
instaObserver.observe(document.body, { childList: true, subtree: true });

// Premier lancement
cleanInstagram();