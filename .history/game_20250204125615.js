addEventListener('DOMContentLoaded', () => {
    main();
});

def main():
    player = document.getElementById("player");
    gameContainer = document.getElementById("gameContainer");
    ground = document.getElementById("ground");

    isJumping = False
    gravity = 0.8
    velocity = 0
    position = 0

    def movePlayer():
        nonlocal isJumping, velocity, position
        if isJumping:
            velocity -= gravity
            position += velocity

            if position <= 0:
                position = 0
                velocity = 0
                isJumping = False

            player.style.bottom = f"{position}px"

    def jump():
        nonlocal isJumping, velocity
        if not isJumping:
            isJumping = True
            velocity = 15

    def moveLeft():
        nonlocal player
        currentLeft = int(player.style.left) or 0
        player.style.left = f"{currentLeft - 5}px"

    def moveRight():
        nonlocal player
        currentLeft = int(player.style.left) or 0
        player.style.left = f"{currentLeft + 5}px"

    def keydown(e):
        if e.key == "ArrowUp":
            jump()
        if e.key == "ArrowLeft":
            moveLeft()
        if e.key == "ArrowRight":
            moveRight()

    document.addEventListener("keydown", keydown)

    def gameLoop():
        movePlayer()
        requestAnimationFrame(gameLoop)

    gameLoop()
