class Player {
  constructor(element) {
    this.element = element;
    this.velocity = 0;
    this.position = 0;
    this.isJumping = false;
    this.playerOnGround = false;
    this.gravity = 0.8;
    this.jumpStrength = 15;
    this.speed = 5;
  }

  // Applique la gravité et la gestion du saut
  updatePosition(platforms) {
    if (this.isJumping) {
      this.velocity -= this.gravity; // Applique la gravité
      this.position += this.velocity; // Met à jour la position verticale

      let onAnyPlatform = false;

      // Vérifier si le joueur touche une plateforme
      platforms.forEach((platform) => {
        if (platform.isPlayerOnPlatform(this.element)) {
          this.position = platform.y + platform.hauteur; // Positionner le joueur sur la plateforme
          this.velocity = 0; // Réinitialise la vitesse verticale
          this.isJumping = false; // Le saut est terminé
          this.playerOnGround = true;
          onAnyPlatform = true;
        }
      });

      // Si le joueur n'est pas sur une plateforme et touche le sol
      if (!onAnyPlatform && this.position <= 0) {
        this.position = 0; // Replacer le joueur au sol
        this.velocity = 0; // Arrêter la chute
        this.playerOnGround = true;
      }
    } else {
      this.velocity -= this.gravity;
      this.position += this.velocity;

      let onAnyPlatform = false;

      // Vérifier si le joueur touche une plateforme
      platforms.forEach((platform) => {
        if (platform.isPlayerOnPlatform(this.element)) {
          this.position = platform.y + platform.hauteur; // Positionner le joueur sur la plateforme
          this.velocity = 0; // Réinitialise la vitesse verticale
          onAnyPlatform = true;
          this.playerOnGround = true;
        }
      });

      // Si le joueur n'est pas sur une plateforme, il tombe
      if (!onAnyPlatform && this.position <= 0) {
        this.position = 0;
        this.velocity = 0;
        this.playerOnGround = true;
      }
    }

    this.element.style.bottom = `${this.position}px`;
  }

  // Sauter
  jump() {
      this.isJumping = true;
      this.velocity = this.jumpStrength;
      this.playerOnGround = false;
  }

  // Déplacer le joueur à gauche
  moveLeft() {
    const currentLeft = parseInt(this.element.style.left) || 0;
    this.element.style.left = `${currentLeft - this.speed}px`;
  }

  // Déplacer le joueur à droite
  moveRight() {
    const currentLeft = parseInt(this.element.style.left) || 0;
    this.element.style.left = `${currentLeft + this.speed}px`;
  }
}
