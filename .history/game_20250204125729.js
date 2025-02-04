addEventListener('DOMContentLoaded', () => {
    main();
});

function main():
    drawPlatform();
    drawPlayer();
    drawEntities();
    gameRunning = true;
    
function drawPlatform():
    foreach(plateforme in platforms) {
        plateforme.draw();
    }
