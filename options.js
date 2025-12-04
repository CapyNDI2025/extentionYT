const options = ["hideComments", "hideSidebar", "hideShorts", "hideHomepage"];

// Charger les réglages
chrome.storage.sync.get(options, (result) => {
    options.forEach(opt => {
        document.getElementById(opt).checked = result[opt] || false;
    });
});

// Sauvegarder lorsqu'on coche/décoche
options.forEach(opt => {
    document.getElementById(opt).addEventListener("change", (e) => {
        const value = e.target.checked;
        chrome.storage.sync.set({ [opt]: value });
    });
});
