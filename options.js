const options = [
    "hideComments",
    "hideSidebar",
    "hideShorts",
    "hideHomepage",
    "hideInstaReels",
    "hideInstaExplore",
    "hideInstaStories",
    "hideInstaPosts",
    "hideInstaNotifications",
    "hideTikTokForYou",
    "hideTikTokExplore",
    "hideTikTokFollowing",
    "hideTikTokLive",
    "hideTikTokActivity",
    "hideTikTokFriends"
];

const postsCheckbox = document.getElementById('hideInstaPosts');
const exploreCheckbox = document.getElementById('hideInstaExplore');

function updateExploreState() {
    if (postsCheckbox.checked) {
        exploreCheckbox.checked = true;
        exploreCheckbox.disabled = true;
        chrome.storage.sync.set({ 'hideInstaExplore': true });
    } else {
        exploreCheckbox.disabled = false;
    }
}

chrome.storage.sync.get(options, (result) => {
    options.forEach(opt => {
        document.getElementById(opt).checked = result[opt] || false;
    });
    updateExploreState();
});

// Sauvegarder lorsqu'on coche/décoche
options.forEach(opt => {
    const element = document.getElementById(opt);

    element.addEventListener("change", (e) => {
        const value = e.target.checked;
        chrome.storage.sync.set({ [opt]: value });

        if (opt === 'hideInstaPosts') {
            updateExploreState();
        }
    });
});

// Chargement initial des préférences
chrome.storage.sync.get(["hideShorts"], prefs => {
    document.getElementById("hideShorts").checked = prefs.hideShorts ?? true;
});

// Sauvegarde en temps réel
document.getElementById("hideShorts").addEventListener("change", (e) => {
    chrome.storage.sync.set({ hideShorts: e.target.checked });
});

