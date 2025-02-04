// platform.ts

export class Platform {
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
    document.getElementById("gameContainer")?.appendChild(this.element); // Ajout au conteneur du jeu
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
