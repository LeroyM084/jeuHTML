const player = document.getElementById("player");
const gameContainer = document.getElementById("gameContainer");

let isJumping = false;
let gravity = 0.8; // Gravité qui pousse le joueur vers le bas
let velocity = 0; // Vitesse verticale du joueur
let position = 0; // Position verticale du joueur
let playerOnGround = false; // Si le joueur est au sol ou sur une plateforme
let platforms = []; // Liste des plateformes

// Crée une plateforme avec les paramètres x, y, hauteur et longueur
function addPlatform(x, y, hauteur, longueur) {
  const platform = new Platform(x, y, hauteur, longueur);
  platforms.push(platform);
}

// Déplacer le joueur
function movePlayer() {
  if (isJumping) {
    velocity -= gravity; // Applique la gravité
    position += velocity; // Met à jour la position du joueur

    let onAnyPlatform = false;

    // Vérifier si le joueur touche une plateforme
    platforms.forEach((platform) => {
      if (platform.isPlayerOnPlatform(player)) {
        position = platform.y + platform.hauteur; // Positionner le joueur sur la plateforme
        velocity = 0; // Réinitialise la vitesse verticale (le joueur ne tombe plus)
        isJumping = false; // Le saut est terminé
        playerOnGround = true; // Le joueur est sur une plateforme
        onAnyPlatform = true; // Le joueur est sur une plateforme
      }
    });

    // Si le joueur n'est pas sur une plateforme, il tombe
    if (!onAnyPlatform && position <= 0) {
      position = 0; // Replacer le joueur au sol
      velocity = 0; // Arrêter la chute
      playerOnGround = true; // Le joueur est sur le sol
    }

    player.style.bottom = `${position}px`;
  } else {
    // Si le joueur n'est pas en l'air, appliquer la gravité
    velocity -= gravity;
    position += velocity;

    let onAnyPlatform = false;

    // Vérifier si le joueur touche une plateforme
    platforms.forEach((platform) => {
      if (platform.isPlayerOnPlatform(player)) {
        position = platform.y + platform.hauteur; // Positionner le joueur sur la plateforme
        velocity = 0; // Réinitialise la vitesse verticale
        onAnyPlatform = true;
        playerOnGround = true; // Le joueur est sur une plateforme
      }
    });

    // Si le joueur n'est pas sur une plateforme, il tombe
    if (!onAnyPlatform && position <= 0) {
      position = 0; // Replacer le joueur au sol
      velocity = 0; // Arrêter la chute
      playerOnGround = true; // Le joueur est sur le sol
    }

    player.style.bottom = `${position}px`;
  }
}

// Fonction de saut
function jump() {
  // Permet au joueur de sauter seulement s'il est sur une plateforme ou le sol
  if (playerOnGround) {
    isJumping = true;
    velocity = 15; // La vitesse initiale du saut
    playerOnGround = false; // Le joueur n'est plus sur le sol ou une plateforme
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

// Écouter les touches du clavier
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") jump(); // Sauter
  if (e.key === "ArrowLeft") moveLeft(); // Déplacement à gauche
  if (e.key === "ArrowRight") moveRight(); // Déplacement à droite
});

// Fonction de boucle de jeu
function gameLoop() {
  movePlayer();
  requestAnimationFrame(gameLoop);
}

// Ajouter des plateformes
addPlatform(100, 100, 20, 200); // Exemple de plateforme à (100, 100) avec une hauteur de 20px et longueur de 200px
addPlatform(300, 150, 20, 150); // Exemple de plateforme à (300, 150) avec une hauteur de 20px et longueur de 150px

gameLoop();
