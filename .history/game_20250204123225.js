const player = document.getElementById("player");
const gameContainer = document.getElementById("gameContainer");

let isJumping = false;
let gravity = 0.8; // La gravité
let velocity = 0; // La vitesse verticale du joueur
let position = 0; // Position verticale du joueur
let platforms = []; // Liste des plateformes
let playerOnGround = false; // Si le joueur est sur le sol ou une plateforme

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
        position = platform.y + platform.hauteur; // Position sur la plateforme
        velocity = 0; // Arrêter la chute
        isJumping = false; // Fin du saut
        onAnyPlatform = true;
      }
    });

    // Si le joueur n'est pas sur une plateforme, il tombe
    if (!onAnyPlatform && position <= 0) {
      position = 0;
      velocity = 0;
      playerOnGround = true; // Le joueur est au sol
    }

    player.style.bottom = `${position}px`;
  } else {
    // Si le joueur n'est pas en train de sauter, appliquer la gravité
    velocity -= gravity;
    position += velocity;

    let onAnyPlatform = false;

    platforms.forEach((platform) => {
      if (platform.isPlayerOnPlatform(player)) {
        position = platform.y + platform.hauteur;
        velocity = 0;
        onAnyPlatform = true;
        playerOnGround = true; // Le joueur est sur une plateforme
      }
    });

    // Si aucune plateforme n'est sous le joueur, il tombe
    if (!onAnyPlatform && position <= 0) {
      position = 0;
      velocity = 0;
      playerOnGround = true;
    }

    player.style.bottom = `${position}px`;
  }
}

// Sauter
function jump() {
  if (playerOnGround || ) {
    isJumping = true;
    velocity = 15; // Le joueur saute avec une certaine vitesse initiale
    playerOnGround = false; // Désactive le saut si le joueur est déjà en l'air
  }
}

// Déplacement à gauche
function moveLeft() {
  const currentLeft = parseInt(player.style.left) || 0;
  player.style.left = `${currentLeft - 5}px`;
}

// Déplacement à droite
function moveRight() {
  const currentLeft = parseInt(player.style.left) || 0;
  player.style.left = `${currentLeft + 5}px`;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") jump();
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
});

function gameLoop() {
  movePlayer();
  requestAnimationFrame(gameLoop);
}

// Ajout des plateformes
addPlatform(100, 100, 20, 200); // Plateforme en (x:100, y:100) de hauteur 20px et longueur 200px
addPlatform(300, 150, 20, 150); // Plateforme en (x:300, y:150) de hauteur 20px et longueur 150px

gameLoop();
