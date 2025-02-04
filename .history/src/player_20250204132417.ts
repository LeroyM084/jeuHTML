// src/player.ts
import { Platform } from './platform';

export class Player {
    x: number;
    y: number;
    width: number;
    height: number;
    velocityY: number;
    gravity: number;
    jumpPower: number;
    isJumping: boolean;
    element: HTMLElement;

    constructor() {
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
        document.getElementById("gameContainer")?.appendChild(this.element);
    }

    move(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
        this.element.style.left = `${this.x}px`;
        this.element.style.bottom = `${this.y}px`;
    }

    jump(): void {
        if (!this.isJumping) {
            this.isJumping = true;
            this.velocityY = this.jumpPower;
        }
    }

    applyGravity(platforms: Platform[]): void {
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