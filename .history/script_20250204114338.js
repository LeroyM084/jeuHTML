const player = document.getElementById('player');
const gameContainer = document.getElementById('gameContainer');
const ground = document.getElementById('ground');

let isJumping = false;
let gravity = 0.8;
let velocity = 0;
let position = 0;

function movePlayer() {
  if (isJumping) {
    velocity -= gravity;
    position += velocity;

    if (position <= 0) {
      position = 0;
      velocity = 0;
      isJumping = false;
    }

    player.style.bottom = `${position}px`;
  }
}

function jump() {
  if (!isJumping) {
    isJumping = true;
    velocity = 15;
  }
}

function moveLeft() {
  const currentLeft = parseInt(player.style.left) || 0;
  player.style.left = `${currentLeft - 5}px`;
}

function moveRight() {
  const currentLeft = parseInt(player.style.left) || 0;
  player.style.left = `${currentLeft + 5}px`;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') jump();
  if (e.key === 'ArrowLeft') moveLeft();
  if (e.key === 'ArrowRight') moveRight();
});

function gameLoop() {
  movePlayer();
  requestAnimationFrame(gameLoop);
}

gameLoop();
