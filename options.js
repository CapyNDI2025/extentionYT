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

// Chargement initial des préférences
chrome.storage.sync.get(["hideShorts"], prefs => {
    document.getElementById("hideShorts").checked = prefs.hideShorts ?? true;
});

// Sauvegarde en temps réel
document.getElementById("hideShorts").addEventListener("change", (e) => {
    chrome.storage.sync.set({ hideShorts: e.target.checked });
});

