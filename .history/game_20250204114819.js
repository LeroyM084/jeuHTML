const player = document.getElementById("player");
const gameContainer = document.getElementById("gameContainer");

let isJumping = false;
let gravity = 0.8;
let velocity = 0;
let position = 0;
let platforms = []; // Liste des plateformes
let playerOnGround = false;

// Crée une plateforme à ajouter
function addPlatform(x, y, hauteur, longueur) {
  const platform = new Platform(x, y, hauteur, longueur);
  platforms.push(platform);
}

// Déplacer le joueur
function movePlayer() {
  if (isJumping) {
    velocity -= gravity;
    position += velocity;

    let onAnyPlatform = false;

    // Vérifier si le joueur est sur une plateforme
    platforms.forEach((platform) => {
      if (platform.isPlayerOnPlatform(player)) {
        position = platform.y + platform.hauteur; // Position sur la plateforme
        velocity = 0;
        isJumping = false;
        onAnyPlatform = true;
      }
    });

    if (!onAnyPlatform && position <= 0) {
      position = 0;
      velocity = 0;
      isJumping = false;
    }

    player.style.bottom = `${position}px`;
  }
}

// Sauter
function jump() {
  if (!isJumping) {
    isJumping = true;
    velocity = 15;
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

// Ajout d'exemples de plateformes
addPlatform(100, 100, 20, 200); // Plateforme en (x:100, y:100) de 20px de hauteur et 200px de longueur
addPlatform(300, 150, 20, 150); // Plateforme en (x:300, y:150) de 20px de hauteur et 150px de longueur

gameLoop();
