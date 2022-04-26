import Phaser, { Display } from "phaser";

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = { 
    fontFamily: "'Lato', sans-serif", 
    fontSize: "2rem",
    stroke: "#000",
    strokeThickness: 2
};

export class ProgressBar extends Phaser.GameObjects.Container {
    width: number;
    height: number;

    graphicMask: Phaser.GameObjects.Graphics;
    geometryMask: Display.Masks.GeometryMask;

    background: Phaser.GameObjects.Rectangle;
    backgroundColor: number;
    fill: Phaser.GameObjects.Rectangle;
    fillColor: number;
    
    text: Phaser.GameObjects.Text;

    max: number;
    current: number;
    barMax: number;
    barCurrent: number;
    incrementAmount: number;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, backgroundColor: number = 0xFF0000, fillColor: number = 0x00FF00, max: number = 20, current?: number) {
        super(scene, x, y);
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.fillColor = fillColor;
        this.max = max;
        this.current = current ?? max;
        this.incrementAmount = width / this.max;
        this.barMax = this.incrementAmount * this.max; 
        this.barCurrent = this.current * this.incrementAmount;

        this.graphicMask = new Phaser.GameObjects.Graphics(scene).fillRoundedRect(x, y, width, height, 10);
        this.add(this.graphicMask);
        this.geometryMask = new Display.Masks.GeometryMask(scene, this.graphicMask);
        this.setMask(this.geometryMask);

        this.background = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, backgroundColor)
            .setOrigin(0);
        this.add(this.background);

        this.fill = new Phaser.GameObjects.Rectangle(scene, 0, 0, this.barCurrent, height, fillColor)
            .setOrigin(0);
        this.add(this.fill);

        this.text = new Phaser.GameObjects.Text(scene, width/2, height/2, `${this.current}/${this.max}`, textStyle).setOrigin(0.5);
        this.add(this.text);
    }

    setMax = (newMax: number) => {
        this.max = newMax;
        this.incrementAmount = this.width / this.max;
        this.barMax = this.incrementAmount * this.max;
        this.barCurrent = this.current * this.incrementAmount;
        this.text.text = `${this.current}/${this.max}`;

        const tween = this.scene.tweens.add({
            targets: this.fill,
            props: {
                width: { value: `${this.current * this.incrementAmount}`, duration: 300, ease: "Power2" }
            }
        });
    }

    setProgress = (newProgress: number) => {
        this.current = newProgress;
        this.barCurrent = (newProgress * this.incrementAmount);
        this.text.text = `${this.current}/${this.max}`;

        const tween = this.scene.tweens.add({
            targets: this.fill,
            props: {
                width: { value: `${this.barCurrent}`, duration: 300, ease: "Power2" }
            }
        });
    }

    increaseProgress = (amount: number) => {
        this.current += amount;
        this.barCurrent += (amount * this.incrementAmount);
        this.text.text = `${this.current}/${this.max}`;

        const tween = this.scene.tweens.add({
            targets: this.fill,
            props: {
                width: { value: `+=${amount * this.incrementAmount}`, duration: 300, ease: "Power2" }
            }
        });
    }

    decreaseProgress = (amount: number) => {
        this.current -= amount;
        this.barCurrent -= (amount * this.incrementAmount);
        this.text.text = `${this.current}/${this.max}`;

        const tween = this.scene.tweens.add({
            targets: this.fill,
            props: {
                width: { value: `-=${amount * this.incrementAmount}`, duration: 300, ease: "Power2" }
            }
        });
    }
}