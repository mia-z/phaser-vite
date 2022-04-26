import Phaser, { GameObjects, Geom } from 'phaser';
import Button from '../components/Button';

export default class MainMenu extends Phaser.Scene {
	constructor() {
		super('MainMenuScene');
	}

	init = () => {
        
	}
	
	preload = () => {
        
	}

	create = () => {
		const playButton = new Button(this, this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, this.sys.game.canvas.width/2, 125, undefined, "Play", () => { this.scene.start("GameScene") });
        this.add.existing(playButton);
	}

	update = (time: number, delta: number) => {

    }
}
