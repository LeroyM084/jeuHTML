// game.ts

// Sélectionner le conteneur du jeu
const gameContainer = document.getElementById("gameContainer") as HTMLElement;

if (!gameContainer) {
    console.error("Le conteneur du jeu (gameContainer) n'a pas été trouvé dans le DOM.");
}

// Classe Platform pour gérer les plateformes
class Platform {
  x: number;
  y: number;
  hauteur: number;
  longueur: number;
  element: HTMLElement;

  constructor(x: number, y: number, hauteur: number, longueur: number) {
    this.x = x;
    this.y = y;
    this.hauteur = hauteur;
    this.longueur = longueur;

    // Création de l'élément div pour la plateforme
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.left = `${x}px`;
    this.element.style.bottom = `${y}px`;
    this.element.style.height = `${hauteur}px`;
    this.element.style.width = `${longueur}px`;
    this.element.style.backgroundColor = "green"; // Couleur de la plateforme
    gameContainer.appendChild(this.element); // Ajout au conteneur du jeu
  }

  // Vérifie si le joueur est sur la plateforme
  isPlayerOnPlatform(player: HTMLElement): boolean {
    const playerLeft = parseInt(player.style.left) || 0;
    const playerBottom = parseInt(player.style.bottom) || 0;
    const playerHeight = parseInt(player.style.height) || 50; // Hauteur par défaut du joueur

    return (
      playerLeft + player.offsetWidth > this.x &&
      playerLeft < this.x + this.longueur &&
      playerBottom <= this.y + this.hauteur &&
      playerBottom >= this.y
    );
  }

  // Dessine la plateforme
  draw(): void {
    this.element.style.position = "absolute";
    this.element.style.left = `${this.x}px`;
    this.element.style.bottom = `${this.y}px`;
    this.element.style.height = `${this.hauteur}px`;
    this.element.style.width = `${this.longueur}px`;
    this.element.style.backgroundColor = "green"; // Couleur de la plateforme
  }
}

// Classe Player pour gérer le joueur
class Player {
  element: HTMLElement;
  x: number;
  y: number;
  width: number;
  height: number;
  velocityY: number;
  gravity: number;
  jumpPower: number;
  isJumping: boolean;

  constructor() {
    this.x = 100; // Position initiale X
    this.y = 50; // Position initiale Y
    this.width = 50; // Largeur du joueur
    this.height = 50; // Hauteur du joueur
    this.velocityY = 0; // Vitesse verticale du joueur
    this.gravity = -1; // Force de la gravité
    this.jumpPower = 20; // Puissance du saut
    this.isJumping = false;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.left = `${this.x}px`;
    this.element.style.bottom = `${this.y}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.backgroundColor = "blue"; // Couleur du joueur
    gameContainer.appendChild(this.element);
  }

  // Déplace le joueur
  move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
    this.element.style.left = `${this.x}px`;
    this.element.style.bottom = `${this.y}px`;
  }

  // Applique la gravité au joueur
  applyGravity(platforms: Platform[]): void {
    this.velocityY += this.gravity;

    // Détecter les plateformes et ajuster la position du joueur
    let onPlatform = false;
    platforms.forEach(platform => {
      if (platform.isPlayerOnPlatform(this.element)) {
        this.velocityY = 0; // Arrêt de la chute
        onPlatform = true;
        this.y = platform.y + platform.hauteur; // Le joueur se pose sur la plateforme
      }
    });

    if (!onPlatform) {
      this.y += this.velocityY; // Si pas sur une plateforme, continuer de tomber
    }

    this.element.style.bottom = `${this.y}px`;
  }

  // Sauter
  jump(): void {
    if (this.velocityY === 0) { // Permet de sauter uniquement si le joueur est au sol
      this.velocityY = this.jumpPower;
    }
  }
}

// Initialisation du jeu
const platforms: Platform[] = [];
const player = new Player();

// Création des plateformes
const platform1 = new Platform(200, 100, 20, 150);
platforms.push(platform1);

const platform2 = new Platform(400, 200, 20, 150);
platforms.push(platform2);

// Dessin des plateformes
platforms.forEach(platform => platform.draw());

// Ajout des événements clavier pour le joueur
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    player.move(-10, 0); // Déplacer le joueur vers la gauche
  } else if (event.key === "ArrowRight") {
    player.move(10, 0); // Déplacer le joueur vers la droite
  } else if (event.key === " " || event.key === "ArrowUp") {
    player.jump(); // Faire sauter le joueur
  }
});

// Mise à jour du jeu toutes les 16 ms (60 fps)
function gameLoop() {
  player.applyGravity(plat
