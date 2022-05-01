import Phaser, { Display } from "phaser";

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = { 
    fontFamily: "'Lato', sans-serif", 
    fontSize: "2rem",
    stroke: "#000",
    strokeThickness: 2
};

export class LinearProgressBar extends Phaser.GameObjects.Container {
    width: number;
    height: number;

    graphicMask: Phaser.GameObjects.Graphics;
    geometryMask: Display.Masks.GeometryMask;

    background: Phaser.GameObjects.Rectangle;
    backgroundColor: number;
    fill: Phaser.GameObjects.Rectangle;
    fillColor: number;
    
    text: Phaser.GameObjects.Text;
    icon: Phaser.GameObjects.Sprite;

    max: number;
    current: number;
    barMax: number;
    barCurrent: number;
    incrementAmount: number;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, backgroundColor: number = 0xFF0000, fillColor: number = 0x00FF00, icon?: string, iconPlacement: "left" | "right" = "left") {
        super(scene, x, y);
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.fillColor = fillColor;
        this.max = (width/7)*6;
        this.current = 0;
        this.incrementAmount = (width/7)*6 / this.max;
        this.barMax = this.incrementAmount * this.max; 
        this.barCurrent = this.current * this.incrementAmount;

        this.graphicMask = new Phaser.GameObjects.Graphics(scene).fillRoundedRect(iconPlacement === "left" ? (this.width/7)+x : x, y, (this.width/7)*6, height, 10);
        this.geometryMask = new Display.Masks.GeometryMask(scene, this.graphicMask);

        this.background = new Phaser.GameObjects.Rectangle(scene, iconPlacement === "left" ? this.width/7 : 0, 0, (this.width/7)*6, height, backgroundColor)
            .setOrigin(0)
            .setMask(this.geometryMask);
        this.add(this.background);

        this.fill = new Phaser.GameObjects.Rectangle(scene, iconPlacement === "left" ? this.width/7 : 0, 0, this.barCurrent, height, fillColor)
            .setOrigin(0)            
            .setMask(this.geometryMask);
        this.add(this.fill);

        this.icon = new Phaser.GameObjects.Sprite(this.scene, iconPlacement === "left" ? 0 : ((this.width/7)*6) + 5, 5, icon!).setOrigin(0);
        this.add(this.icon)
		this.icon.displayWidth = (this.width/7)-5;
		this.icon.displayHeight = this.height-10;
        this.icon.setTintFill(this.fillColor);

        this.text = new Phaser.GameObjects.Text(scene, iconPlacement === "left" ? (this.width/2) + ((this.width/7)/2) : (this.width/2) - ((this.width/7)/2), height/2, `${Math.floor(this.current/this.max)}%`, textStyle).setOrigin(0.5);
        this.add(this.text);
    }

    getIconCenter = () => {
        return {
            x: this.x + this.icon.x + (this.icon.displayWidth/2),
            y: this.y + this.icon.y + (this.icon.displayHeight/2)
        }
    }

    setProgress = (newProgress: number) => {
        this.current = newProgress;
        this.barCurrent = Math.floor((this.max / 100) * newProgress);
        this.text.text = `${newProgress}%`;

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