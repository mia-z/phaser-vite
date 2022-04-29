import Phaser, { Display } from "phaser";

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = { 
    fontFamily: "'Lato', sans-serif", 
    fontSize: "2rem",
    stroke: "#000",
    strokeThickness: 2
};

export default class Button extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        
    }
}