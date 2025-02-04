const playerElement = document.getElementById("player");
const gameContainer = document.getElementById("gameContainer");

const player = new Player(playerElement); // Création du joueur

let platforms = []; // Liste des plateformes

// Crée une plateforme avec les paramètres x, y, hauteur et longueur
function addPlatform(x, y, hauteur, longueur) {
  const platform = new Platform(x, y, hauteur, longueur);
  platforms.push(platform);
}

// Fonction de boucle de jeu
function gameLoop() {
  player.updatePosition(platforms); // Met à jour la position du joueur
  requestAnimationFrame(gameLoop); // Continue la boucle de jeu
}

// Ajouter des plateformes
addPlatform(100, 100, 20, 200); // Exemple de plateforme
addPlatform(300, 150, 20, 150); // Exemple de plateforme

gameLoop();

// Écouter les touches du clavier
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") player.jump(); // Sauter
  if (e.key === "ArrowLeft") player.moveLeft(); // Déplacement à gauche
  if (e.key === "ArrowRight") player.moveRight(); // Déplacement à droite
});
