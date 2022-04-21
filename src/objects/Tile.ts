import { TileName, TileType } from "../Types/Tile";

const gridSize: number = 6;
const baseTileSide: number = Math.floor(600 / gridSize);

export class Tile extends Phaser.GameObjects.Image {
    id: number;
    column: number;
    tileType: TileType;
    tileName: TileName;
    intersector: Phaser.Geom.Circle;
    intersectoryOverlay: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, id: number, x: number, y: number, image: string, column: number, tileType: TileType, tileName: TileName) {
        super(scene, x, y, image);
        this.id = id;
        this.column = column;
        this.setOrigin(0);
        this.setInteractive();
        this.displayHeight = baseTileSide;
        this.displayWidth = baseTileSide;
        this.tileName = tileName;
        this.tileType = tileType;
        this.intersector = new Phaser.Geom.Circle(x, y, Math.floor((baseTileSide / 2) * 0.7));
        this.intersectoryOverlay = new Phaser.GameObjects.Graphics(scene);
        this.intersectoryOverlay.lineStyle(2, 0xFF00FF);
        scene.add.existing(this.intersectoryOverlay);
        this.intersectoryOverlay.strokeCircleShape(this.intersector);
        this.on("pointerup", this.pointerUpFunc);
        this.on("pointerdown", this.pointerDownFunc);
        this.on("pointermove", this.pointerMoveFunc);
        this.on("destroy", this.onDestroy);
        this.addToUpdateList;
    }

    pointerDownFunc = (pointer: Phaser.Input.Pointer, localX: number, localY: number, eventData: Phaser.Types.Input.EventData) => {
        console.log(`down on ${this.id}`);
    }

    pointerMoveFunc = (pointer: Phaser.Input.Pointer, localX: number, localY: number, eventData: Phaser.Types.Input.EventData) => {
        console.log(`moving on ${this.id}`);
    }

    pointerUpFunc = (pointer: Phaser.Input.Pointer, localX: number, localY: number, eventData: Phaser.Types.Input.EventData) => {
        console.log(`up on ${this.id}`);
        this.destroy();
    }

    onDestroy = () => {
        this.scene.events.emit("replaceTile", this.column);
    }
}