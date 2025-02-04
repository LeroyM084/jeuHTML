addEventListener('DOMContentLoaded', () => {
    main();
});

function main():
    drawPlatform();
    drawPlayer();
    drawEntities();
    gameRunning = true;
    
function drawPlatform():
    for plateforme in platforms {
