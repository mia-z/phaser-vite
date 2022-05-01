import Phaser, { Display, GameObjects } from "phaser";

const gridSize: number = 6;
const baseTileSide: number = Math.floor(600 / gridSize);

export class TileBase extends Phaser.GameObjects.Container {
    id: number;
    column: number;

    intersector?: Phaser.Geom.Circle;
    intersectoryOverlay?: Phaser.GameObjects.Graphics;
    
    shouldAnimate: boolean = false;

    constructor(scene: Phaser.Scene, id: number, x: number, y: number, column: number) {
        super(scene, x + baseTileSide/4, y);

        this.setSize(baseTileSide, baseTileSide);
        this.on("pointerup", this.pointerUpFunc);
        this.on("pointerdown", this.pointerDownFunc);
        this.on("pointermove", this.pointerMoveFunc);
        this.on("dim", this.onSetDim);
        this.on("undim", this.onUnsetDim);
        this.setInteractive();

        this.id = id;
        this.column = column;

        //const mask = new Display.Masks.GeometryMask(this.scene, this.scene.children.getByName("container-mask") as GameObjects.Graphics);
        //this.setMask(mask);
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

    onSetDim = () => {
        this.alpha = 0.3;
    }

    onUnsetDim = () => {
        this.alpha = 1;
    }
}