export class Player {
    constructor() {
        var _a;
        this.x = 100;
        this.y = 50;
        this.width = 50;
        this.height = 50;
        this.velocityY = 0;
        this.gravity = -1;
        this.jumpPower = 20;
        this.isJumping = false;
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.left = `${this.x}px`;
        this.element.style.bottom = `${this.y}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.backgroundColor = "blue";
        (_a = document.getElementById("gameContainer")) === null || _a === void 0 ? void 0 : _a.appendChild(this.element);
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
        this.element.style.left = `${this.x}px`;
        this.element.style.bottom = `${this.y}px`;
    }
    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.velocityY = this.jumpPower;
        }
    }
    applyGravity(platforms) {
        this.velocityY += this.gravity;
        let onPlatform = false;
        for (const platform of platforms) {
            if (platform.isPlayerOnPlatform(this.element)) {
                this.velocityY = 0;
                onPlatform = true;
                this.y = platform.y + platform.hauteur;
                this.isJumping = false;
                break;
            }
        }
        if (!onPlatform) {
            this.y += this.velocityY;
        }
        this.element.style.bottom = `${this.y}px`;
    }
}
