const gridSize: number = 6;
const baseTileSide: number = Math.floor(600 / gridSize);

export class TileSprite extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, image: string) {
        super(scene, 0, 0, image);
        this.setOrigin(0);
        this.setDisplaySize(baseTileSide, baseTileSide);
    }
}