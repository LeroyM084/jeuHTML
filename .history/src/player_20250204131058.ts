// player.ts

export class Player {
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
    document.getElementById("gameContainer")?.appendChild(this.element);
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
