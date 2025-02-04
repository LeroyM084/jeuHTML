addEventListener('DOMContentLoaded', () => {
    main();
});

function main():
    drawPlatform();
    drawPlayer();
    drawEntities();
    gameRunning = true;
    
function drawPlatform():
    platforms.forEach((platform) => {
        platform.draw();
    }

plateforme.draw();
    }
