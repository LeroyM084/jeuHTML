// Déclaration des types
let platforms: Platform[] = [];
let gameRunning: boolean = false;

// Ajouter un événement pour s'assurer que le DOM est chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', () => {
    main();
});

// Fonction principale
function main(): void {
    drawPlatform();
    drawPlayer();
    drawEntities();
    gameRunning = true;
}

// Fonction pour dessiner les plateformes
function drawPlatform(): void {
    platforms.forEach((platform) => {
        platform.draw();
    });
}

// Fonction pour dessiner le joueur (exemple à compléter avec la logique du joueur)
function drawPlayer(): void {
    // Logique pour dessiner ou mettre à jour le joueur (à compléter)
}

// Fonction pour dessiner d'autres entités (exemple à compléter)
function drawEntities(): void {
    // Logique pour dessiner ou mettre à jour d'autres entités du jeu (à compléter)
}