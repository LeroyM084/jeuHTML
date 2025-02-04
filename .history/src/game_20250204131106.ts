// game.ts

import { Platform } from './platform';
import { Player } from './player';

// Sélectionner le conteneur du jeu
const gameContainer = document.getElementById("gameContainer") as HTMLElement;

if (!gameContainer) {
    console.error("Le conteneur du jeu (gameContainer) n'a pas été trouvé dans le DOM.");
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
  player.applyGravity(platforms);
  requestAnimationFrame(gameLoop); // Appel de la fonction de boucle de jeu
}

// Démarrer la boucle de jeu
gameLoop();
