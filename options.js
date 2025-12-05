const options = [
    "hideComments",
    "hideSidebar",
    "hideShorts",
    "hideHomepage",
    "hideInstaReels",
    "hideInstaExplore",
    "hideInstaStories",
    "hideInstaPosts",
    "hideInstaNotifications"
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