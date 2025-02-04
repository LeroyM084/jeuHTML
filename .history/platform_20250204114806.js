class Platform {
  constructor(x, y, hauteur, longueur) {
    this.x = x;
    this.y = y;
    this.hauteur = hauteur;
    this.longueur = longueur;
    this.element = this.createPlatform();
  }

  // Créer la plateforme HTML et la positionner
  createPlatform() {
    const platform = document.createElement("div");
    platform.style.position = "absolute";
    platform.style.left = `${this.x}px`;
    platform.style.bottom = `${this.y}px`;
    platform.style.width = `${this.longueur}px`;
    platform.style.height = `${this.hauteur}px`;
    platform.style.backgroundColor = "green";
    document.getElementById("gameContainer").appendChild(platform);
    return platform;
  }

  // Vérifier si le joueur est sur la plateforme
  isPlayerOnPlatform(player) {
    const playerLeft = parseInt(player.style.left);
    const playerRight = playerLeft + player.offsetWidth;
    const platformLeft = this.x;
    const platformRight = this.x + this.longueur;
    const playerBottom = parseInt(player.style.bottom);

    return (
      playerBottom <= this.y + this.hauteur &&
      playerBottom >= this.y &&
      playerLeft < platformRight &&
      playerRight > platformLeft
    );
  }
}
