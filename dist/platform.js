export class Platform {
    constructor(x, y, hauteur, longueur) {
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
    isPlayerOnPlatform(player) {
        const playerLeft = parseInt(player.style.left) || 0;
        const playerBottom = parseInt(player.style.bottom) || 0;
        return (playerLeft + player.offsetWidth > this.x &&
            playerLeft < this.x + this.longueur &&
            playerBottom <= this.y + this.hauteur &&
            playerBottom >= this.y);
    }
    draw() {
        var _a;
        (_a = document.getElementById("gameContainer")) === null || _a === void 0 ? void 0 : _a.appendChild(this.element);
    }
}
