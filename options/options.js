const toggles = [
    "hideHomepage",
    "hideShorts",
    "hideSidebar",
    "hideComments",
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
    if (postsCheckbox && postsCheckbox.checked) {
        exploreCheckbox.checked = true;
        exploreCheckbox.disabled = true;
        chrome.storage.sync.set({ 'hideInstaExplore': true });
    } else if (exploreCheckbox) {
        exploreCheckbox.disabled = false;
    }
}

chrome.storage.sync.get(toggles, (result) => {
    toggles.forEach(opt => {
        const el = document.getElementById(opt);
        if (el) {
            el.checked = result[opt] || false;
            el.addEventListener("change", (e) => {
                const value = e.target.checked;
                chrome.storage.sync.set({ [opt]: value });
                if (opt === 'hideInstaPosts') updateExploreState();
            });
        }
    });
    if (postsCheckbox) updateExploreState();
});



const textArea = document.getElementById("blockedSites");
const saveBtn = document.getElementById("saveBlocklist");
const statusMsg = document.getElementById("saveStatus");

chrome.storage.sync.get(["blockedSitesList"], (result) => {
    if (result.blockedSitesList) {
        textArea.value = result.blockedSitesList;
    }
});

// Sauvegarder
saveBtn.addEventListener("click", () => {
    const rawInput = textArea.value;

    // Nettoyage robuste
    const domains = rawInput
        .split(/[\n,]+/)
        .map(d => d.trim())
        .filter(d => d.length > 0)
        .map(d => {
            let clean = d.toLowerCase();

            clean = clean.replace(/^(https?:\/\/)?(www\.)?/, "");

            clean = clean.split('/')[0];

            return clean;
        })
        .filter(d => d.includes(".") && d.length > 3);

    chrome.storage.sync.set({ blockedSitesList: rawInput });

    updateDynamicRules(domains);
    showSaveStatus();
});

function updateDynamicRules(domains) {
    chrome.declarativeNetRequest.getDynamicRules(oldRules => {
        const oldRuleIds = oldRules.map(rule => rule.id);

        const newRules = domains.map((domain, index) => ({
            "id": 1000 + index,
            "priority": 1,
            "action": { "type": "block" },
            "condition": {
                "urlFilter": domain,
                "isUrlFilterCaseSensitive": false,
                "resourceTypes": ["main_frame"]
            }
        }));

        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: oldRuleIds,
            addRules: newRules
        });
    });
}

function showSaveStatus() {
    if(statusMsg) {
        statusMsg.style.opacity = "1";
        setTimeout(() => {
            statusMsg.style.opacity = "0";
        }, 2000);
    }
}