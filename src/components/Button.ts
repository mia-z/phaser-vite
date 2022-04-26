import Phaser, { Display } from "phaser";

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = { 
    fontFamily: "'Lato', sans-serif", 
    fontSize: "2rem",
    stroke: "#000",
    strokeThickness: 2
};

export default class Button extends Phaser.GameObjects.Container {
    rectangle: Phaser.GameObjects.Rectangle;
    graphicMask: Phaser.GameObjects.Graphics;
    text?: Phaser.GameObjects.Text;

    originalColour: number = 0x5a5c6b;

    onClickCallback?: () => void; 

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height?: number, color: number = 0x5a5c6b, text?: string, onClickCallback?: () => void) {
        height = height ?? width; //We always need a value for height. If height isnt given, we assume a square is being made.

        super(scene, x-(width/2), y-(height/2));

        this.onClickCallback = onClickCallback;

        this.graphicMask = new Phaser.GameObjects.Graphics(scene).fillRoundedRect(0, 0, width, height, 10);
        this.add(this.graphicMask);
        const mask = new Display.Masks.GeometryMask(scene, this.graphicMask);

        this.rectangle = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, color)
            .setInteractive()
            .setOrigin(0)
            .on("pointerover", this.over)
            .on("pointerdown", this.down)
            .on("pointerup", this.up)
            .on("pointerout", this.out)
            .setMask(mask);

        this.add(this.rectangle);

        if (text) {
            this.text = new Phaser.GameObjects.Text(scene, width/2, height/2, text, textStyle)
                .setOrigin(0.5);
            this.add(this.text);
        }
    }

    over = () => {
        this.rectangle.setFillStyle(0x707587);
    }

    down = () => {
        this.rectangle.setFillStyle(0x464349);
    }

    out = () => {
        this.rectangle.setFillStyle(this.originalColour);
    }

    up = () => {
        this.rectangle.setFillStyle(0x707587);
        if (this.onClickCallback)
            this.onClickCallback();
    }
}