// src/platform.ts
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
      this.element = document.createElement("div");
      this.element.style.position = "absolute";
      this.element.style.left = `${x}px`;
      this.element.style.bottom = `${y}px`;
      this.element.style.height = `${hauteur}px`;
      this.element.style.width = `${longueur}px`;
      this.element.style.backgroundColor = "green";
  }

  isPlayerOnPlatform(player: HTMLElement): boolean {
      const playerLeft = parseInt(player.style.left) || 0;
      const playerBottom = parseInt(player.style.bottom) || 0;
      return (
          playerLeft + player.offsetWidth > this.x &&
          playerLeft < this.x + this.longueur &&
          playerBottom <= this.y + this.hauteur &&
          playerBottom >= this.y
      );
  }

  draw(): void {
      document.getElementById("gameContainer")?.appendChild(this.element);
  }
}