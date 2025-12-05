// tiktok.js

let tiktokSettings = {};

function cleanTikTok() {
    const path = window.location.pathname;

    // --- 0. REDIRECTIONS ---

    // Pour toi (page principale) : on cache le contenu pour eviter les boucle redirection 

    // Explorer
    if (tiktokSettings.hideTikTokExplore && (path.includes('/explore') || path.includes('/discover'))) {
        window.location.replace('/');
        return;
    }

    // Suivi (Following)
    if (tiktokSettings.hideTikTokFollowing && (path.includes('/following') || path === '/following')) {
        window.location.replace('/');
        return;
    }

    // Live
    if (tiktokSettings.hideTikTokLive && (path.includes('/live') || path === '/live')) {
        window.location.replace('/');
        return;
    }

    // Activité (Inbox/Notifications)
    if (tiktokSettings.hideTikTokActivity && (path.includes('/inbox') || path.includes('/notifications'))) {
        window.location.replace('/');
        return;
    }

    // Friends
    if (tiktokSettings.hideTikTokFriends && (path.includes('/friends') || path === '/friends')) {
        window.location.replace('/');
        return;
    }

    // --- 1. NAVIGATION & MENUS (SIDEBAR) ---

    // Fonction utilitaire pour cacher par texte (car :has() et :contains() ne sont pas standards partout)
    const hideByText = (selector, texts) => {
        document.querySelectorAll(selector).forEach(el => {
            if (texts.some(t => el.textContent.includes(t))) {
                el.style.display = "none";
            }
        });
    };

    // A. Pour toi (For You)
    if (tiktokSettings.hideTikTokForYou) {
        // Masquer les liens directs
        const selectors = [
            "a[href='/foryou']",
            "a[href='/']",
            "[data-e2e='nav-foryou']",
            "[data-e2e='nav-home']"
        ];
        selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => el.style.display = "none"));
        
        // Masquer par texte (Sidebar)
        hideByText("div[role='button'], a", ["Pour toi", "For You"]);
    }

    // B. Explorer (Explore)
    if (tiktokSettings.hideTikTokExplore) {
        const selectors = [
            "a[href='/explore']",
            "a[href*='/explore']",
            "a[href='/discover']",
            "[data-e2e='nav-explore']",
            "[data-e2e='nav-discover']"
        ];
        selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => el.style.display = "none"));

        hideByText("div[role='button'], a", ["Explorer", "Explore", "Découvrir"]);
    }

    // C. Suivi (Following)
    if (tiktokSettings.hideTikTokFollowing) {
        const selectors = [
            "a[href='/following']",
            "a[href*='/following']",
            "[data-e2e='nav-following']"
        ];
        selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => el.style.display = "none"));

        hideByText("div[role='button'], a", ["Suivi", "Following", "Abonnements"]);
    }

    // D. Live
    if (tiktokSettings.hideTikTokLive) {
        const selectors = [
            "a[href='/live']",
            "a[href*='/live']",
            "[data-e2e='nav-live']",
            "[data-e2e='live-entry']",
            ".live-badge",
            "[data-testid='live-badge']"
        ];
        selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => el.style.display = "none"));

        hideByText("div[role='button'], a", ["LIVE", "Live"]);
    }

    // E. Activité (Inbox/Notifications)
    if (tiktokSettings.hideTikTokActivity) {
        const selectors = [
            "a[href='/inbox']",
            "a[href*='/inbox']",
            "a[href*='/notifications']",
            "[data-e2e='nav-inbox']",
            "[data-e2e='notification-icon']",
            "[data-testid='inbox-icon']",
            "[data-testid='notification-icon']"
        ];
        selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => el.style.display = "none"));

        hideByText("div[role='button'], a", ["Boîte de réception", "Inbox", "Activité", "Activity"]);
    }

    // F. Friends
    if (tiktokSettings.hideTikTokFriends) {
        const selectors = [
            "a[href='/friends']",
            "a[href*='/friends']",
            "[data-e2e='nav-friends']",
            "[data-testid='friends-icon']"
        ];
        selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => el.style.display = "none"));

        hideByText("div[role='button'], a", ["Friends", "Amis"]);
    }

    // --- 2. CONTENU SPÉCIFIQUE (FEED) ---

    // Masquer le flux "Pour toi" si on est sur la page d'accueil
    if (tiktokSettings.hideTikTokForYou && (path === '/' || path === '/foryou' || path.includes('/foryou'))) {
        const feedSelectors = [
            "[data-e2e='recommend-list-item-container']",
            "[data-e2e='feed-container']",
            ".DivFeedContainer" // Classe générique parfois utilisée
        ];
        feedSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => el.style.display = "none");
        });
        
        // Sécurité : masquer le conteneur principal de vidéo si identifié
        const mainContent = document.querySelector('[data-e2e="main-content-home"]'); // Sélecteur hypothétique
        if (mainContent) mainContent.style.display = "none";
    }

    // --- 2. CONTENU SPÉCIFIQUE ---

    // Masquer les vidéos Live dans le flux
    if (tiktokSettings.hideTikTokLive) {
        document.querySelectorAll('[data-e2e="video-item"]').forEach(item => {
            if (item.querySelector('.live-badge, [data-testid="live-badge"], [data-e2e="live-badge"]')) {
                item.style.display = "none";
            }
        });
    }

    // Masquer les suggestions d'explore dans le flux
    if (tiktokSettings.hideTikTokExplore) {
        document.querySelectorAll('[data-e2e="recommend-card"]').forEach(card => {
            card.style.display = "none";
        });
    }

    // --- 3. SIDEBAR & NAVIGATION SUPPLÉMENTAIRE ---

    // Navigation mobile/responsive
    if (tiktokSettings.hideTikTokForYou) {
        document.querySelectorAll('.navigation-item[href="/foryou"], .navigation-item[href="/"]').forEach(item => {
            item.style.display = "none";
        });
    }

    if (tiktokSettings.hideTikTokExplore) {
        document.querySelectorAll('.navigation-item[href*="/explore"], .navigation-item[href*="/discover"]').forEach(item => {
            item.style.display = "none";
        });
    }

    if (tiktokSettings.hideTikTokFollowing) {
        document.querySelectorAll('.navigation-item[href="/following"]').forEach(item => {
            item.style.display = "none";
        });
    }

    if (tiktokSettings.hideTikTokLive) {
        document.querySelectorAll('.navigation-item[href="/live"]').forEach(item => {
            item.style.display = "none";
        });
    }

    if (tiktokSettings.hideTikTokActivity) {
        document.querySelectorAll('.navigation-item[href*="/inbox"], .navigation-item[href*="/notifications"]').forEach(item => {
            item.style.display = "none";
        });
    }

    if (tiktokSettings.hideTikTokFriends) {
        document.querySelectorAll('.navigation-item[href="/friends"]').forEach(item => {
            item.style.display = "none";
        });
    }
}

// Initialisation
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
});

chrome.storage.onChanged.addListener((changes) => {
    for (const key in changes) {
        if (keys.includes(key)) {
            tiktokSettings[key] = changes[key].newValue;
        }
    }
    cleanTikTok();
});