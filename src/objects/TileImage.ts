const gridSize: number = 6;
const baseTileSide: number = Math.floor(600 / gridSize);

export class TileImage extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene, image: string) {
        super(scene, 0, 0, image);
        this.setOrigin(0);
        this.displayHeight = baseTileSide;
        this.displayWidth = baseTileSide;
    }
}