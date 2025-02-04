import { Platform } from './platform';
import { Player } from './player';

const gameContainer = document.getElementById("gameContainer") as HTMLElement;
if (!gameContainer) {
    console.error("Le conteneur du jeu n'a pas été trouvé");
}

const platforms: Platform[] = [];
const player = new Player();

const platform1 = new Platform(200, 100, 20, 150);
platforms.push(platform1);
const platform2 = new Platform(400, 200, 20, 150);
platforms.push(platform2);

platforms.forEach(platform => platform.draw());

document.addEventListener("keydown", (event) => {
    switch(event.key) {
        case "ArrowLeft":
            player.move(-10, 0);
            break;
        case "ArrowRight":
            player.move(10, 0);
            break;
        case " ":
        case "ArrowUp":
            player.jump();
            break;
    }
});

function gameLoop() {
    player.applyGravity(platforms);
    requestAnimationFrame(gameLoop);
}

gameLoop();