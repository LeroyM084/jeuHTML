const player = document.getElementById("player");
const gameContainer = document.getElementById("gameContainer");

let isJumping = false; // Indicateur si le joueur saute
let gravity = 0.8; // Gravité
let velocity = 0; // Vitesse verticale
let position = 0; // Position verticale du joueur
let platforms = []; // Liste des plateformes
let playerOnGround = false; // Si le joueur est sur une plateforme ou le sol

// Crée une plateforme à ajouter
function addPlatform(x, y, hauteur, longueur) {
  const platform = new Platform(x, y, hauteur, longueur);
  platforms.push(platform);
}

// Déplacer le joueur
function movePlayer() {
  if (isJumping) {
    velocity -= gravity; // Appliquer la gravité
    position += velocity;

    let onAnyPlatform = false;

    // Vérifier si le joueur est sur une plateforme
    platforms.forEach((platform) => {
      if (platform.isPlayerOnPlatform(player)) {
        position = platform.y + platform.hauteur; // Positionner le joueur sur la plateforme
        velocity = 0; // Réinitialiser la vitesse verticale
        isJumping = false; // Le joueur a terminé son saut
        onAnyPlatform = true;
      }
    });

    // Si aucune plateforme sous le joueur, il tombe
    if (!onAnyPlatform && position <= 0) {
      position = 0;
      velocity = 0;
      playerOnGround = true; // Le joueur est sur le sol
    }

    player.style.bottom = `${position}px`;
  } else {
    // Si le joueur est au sol, appliquer la gravité
    velocity -= gravity;
    position += velocity;

    let onAnyPlatform = false;

    // Vérifier si le joueur est sur une plateforme
    platforms.forEach((platform) => {
      if (platform.isPlayerOnPlatform(player)) {
        position = platform.y + platform.hauteur; // Positionner le joueur sur la plateforme
        velocity = 0; // Réinitialiser la vitesse
        onAnyPlatform = true;
        playerOnGround = true; // Le joueur est sur une plateforme
      }
    });

    // Si aucune plateforme sous le joueur, il tombe
    if (!onAnyPlatform && position <= 0) {
      position = 0;
      velocity = 0;
      playerOnGround = true; // Le joueur est sur le sol
    }

    player.style.bottom = `${position}px`;
  }
}

// Fonction de saut
function jump() {
  // Permet au joueur de sauter seulement s'il est sur une plateforme
  if (playerOnGround) {
    isJumping = true;
    velocity = 15; // La vitesse initiale du saut
    playerOnGround = false; // Le joueur n'est plus sur le sol ou une plateforme
  }
}

// Déplacer à gauche
function moveLeft() {
  const currentLeft = parseInt(player.style.left) || 0;
  player.style.left = `${currentLeft - 5}px`;
}

// Déplacer à droite
function moveRight() {
  const currentLeft = parseInt(player.style.left) || 0;
  player.style.left = `${currentLeft + 5}px`;
}

// Écouter les touches du clavier
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") jump(); // Sauter
  if (e.key === "ArrowLeft") moveLeft(); // Déplacement à gauche
  if (e.key === "ArrowRight") moveRight(); // Déplacement à droite
});

function gameLoop() {
  movePlayer();
  requestAnimationFrame(gameLoop);
}

// Ajouter des plateformes
addPlatform(100, 100, 20, 200); // Exemple de plateforme à (x:100, y:100)
addPlatform(300, 150, 20, 150); // Exemple de plateforme à (x:300, y:150)

gameLoop();
