# ZenSocial - Extension de Navigation Concentrée

Une extension navigateur moderne qui redonne le contrôle sur votre expérience des réseaux sociaux en masquant les contenus distrayants sur YouTube, Instagram et TikTok.

## Concept et Innovation

ZenSocial répond à un besoin croissant de navigation consciente et concentrée sur les plateformes sociales. L'extension permet de :

- **Réduire les distractions** : Masquer les contenus addictifs comme les Shorts, Reels, ou flux recommandés
- **Personnaliser l'expérience** : Choisir précisément quels éléments afficher ou masquer
- **Préserver la productivité** : Éviter la navigation compulsive grâce à des redirections automatiques
- **Respecter la vie privée** : Fonctionnement entièrement local, aucune donnée collectée

## Fonctionnalités

### YouTube
- Masquage des Shorts (homepage, sidebar, recherche)
- Suppression des commentaires
- Masquage de la sidebar de recommandations
- Suppression des recommandations de la page d'accueil

### Instagram  
- Blocage des Reels avec redirection automatique
- Masquage de l'onglet Explorer/Découvrir
- Suppression des Stories
- Mode texte (masquage des images/vidéos des posts)
- Masquage des notifications

### TikTok
- Blocage du flux "Pour toi" 
- Masquage de l'Explorer/Découvrir
- Blocage des Suivi/Abonnements
- Suppression des Lives
- Masquage de l'Activité/Notifications
- Blocage des Friends


### Domaine
- Blocage d'un domaine mit en paramètre 
 
## Installation

### Depuis les sources (Développement)

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/CapyNDI2025/extentionYT.git
   cd extentionYT
   ```

2. **Charger l'extension dans Chrome/Edge**
   - Ouvrir `chrome://extensions/` ou `edge://extensions/`
   - Activer le "Mode développeur"
   - Cliquer sur "Charger l'extension non empaquetée"
   - Sélectionner le dossier du projet

3. **Configurer les préférences**
   - Cliquer sur l'icône de l'extension dans la barre d'outils
   - Cocher/décocher les options selon vos besoins

## Structure du Projet

```
extentionYT/
├── manifest.json              # Configuration Manifest V3
├── options/
│   ├── options.html          # Interface de configuration
│   └── options.js            # Logique des préférences
├── scripts/
│   ├── youtube.js            # Script pour YouTube
│   ├── instagram.js          # Script pour Instagram
│   └── tiktok.js            # Script pour TikTok
├── rules.json               # Règles de filtrage réseau
└── README.md               # Documentation
```

## Permissions et Vie Privée

### Permissions Requises
- `storage` : Sauvegarde des préférences utilisateur localement
- `declarativeNetRequest` : Filtrage de contenu (règles prédéfinies)
- `host_permissions` : Accès aux sites YouTube, Instagram, TikTok

### Respect de la Vie Privée
- **Aucune collecte de données** : L'extension fonctionne entièrement en local
- **Permissions minimales** : Seuls les accès nécessaires au fonctionnement
- **Transparence totale** : Code source ouvert et auditable
- **Pas de tracking** : Aucune connexion vers des serveurs externes
- **Contrôle utilisateur** : Configuration granulaire des fonctionnalités

## Fonctionnement Technique

### Architecture Manifest V3
L'extension respecte les dernières spécifications de sécurité :
- Scripts de contenu isolés par site
- API declarativeNetRequest pour le filtrage
- Stockage local Chrome Storage API
- Pas de code inline ou eval()

### Détection Dynamique
- Utilisation de `MutationObserver` pour détecter les changements DOM
- Sélecteurs CSS optimisés pour chaque plateforme  
- Gestion des rechargements automatiques de contenu
- Support des interfaces responsive

### Gestion des États
- Sauvegarde automatique des préférences
- Application en temps réel des changements
- Persistance entre les sessions
- Synchronisation entre onglets

## Développement

### Prérequis
- Navigateur compatible Manifest V3 (Chrome 88+, Edge 88+)
- Connaissances JavaScript/DOM
- Git pour la gestion de version

### Architecture du Code
- **Modularité** : Un script par plateforme
- **Réutilisabilité** : Fonctions utilitaires communes
- **Maintenabilité** : Code commenté et structuré
- **Performance** : Optimisation des sélecteurs et observers

## Compatibilité

### Navigateurs Supportés
- Chrome 88+ (Manifest V3 complet)
- Microsoft Edge 88+
- Brave (basé sur Chromium)

### Plateformes Testées
- YouTube (toutes versions)
- Instagram Web
- TikTok Web

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
onnels.