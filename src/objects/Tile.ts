import { TileName, TileType } from "../Types/Tile";
import { TileImage } from "./TileImage";

const gridSize: number = 6;
const baseTileSide: number = Math.floor(600 / gridSize);

export class Tile extends Phaser.GameObjects.Container {
    id: number;
    column: number;
    tileType: TileType;
    tileName: TileName;

    tile: TileImage
    intersector?: Phaser.Geom.Circle;
    intersectoryOverlay?: Phaser.GameObjects.Graphics;
    
    constructor(scene: Phaser.Scene, id: number, x: number, y: number, image: string, column: number, tileType: TileType, tileName: TileName) {
        super(scene, x + baseTileSide/2, y);

        this.setSize(baseTileSide, baseTileSide);
        this.on("pointerup", this.pointerUpFunc);
        this.on("pointerdown", this.pointerDownFunc);
        this.on("pointermove", this.pointerMoveFunc);
        this.on("destroy", this.onDestroy);
        this.setInteractive();

        this.id = id;
        this.column = column;
        this.tileName = tileName;
        this.tileType = tileType;

        this.tile = new TileImage(scene, image);
        this.tile.setOrigin(0.5);
        this.add(this.tile);

        //this.intersector = new Phaser.Geom.Circle(0, 0, Math.floor((baseTileSide / 2) * 0.8));
        //this.intersectoryOverlay = new Phaser.GameObjects.Graphics(scene);
        //this.intersectoryOverlay.lineStyle(2, 0xFF00FF);
        //this.intersectoryOverlay.strokeCircleShape(this.intersector);
        //this.add(this.intersectoryOverlay);
        
    }
    
    pointerDownFunc = (pointer: Phaser.Input.Pointer, localX: number, localY: number, eventData: Phaser.Types.Input.EventData) => {
        if (Phaser.Geom.Circle.ContainsPoint(new Phaser.Geom.Circle(this.x, this.y, Math.floor((baseTileSide / 2) * 0.8)), pointer)) {
            this.scene.events.emit("setStartingDragTile", this);
        }
    }

    pointerMoveFunc = (pointer: Phaser.Input.Pointer, localX: number, localY: number, eventData: Phaser.Types.Input.EventData) => {
        if (Phaser.Geom.Circle.ContainsPoint(new Phaser.Geom.Circle(this.x, this.y, Math.floor((baseTileSide / 2) * 0.8)), pointer)) {
            this.scene.events.emit("draggingIntersect", this);
        }
    }

    pointerUpFunc = (pointer: Phaser.Input.Pointer, localX: number, localY: number, eventData: Phaser.Types.Input.EventData) => {

    }

    onDestroy = () => {
        this.scene.events.emit("replaceTile", this.column);
    }
}