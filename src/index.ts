import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import { App, BackButtonListener, BackButtonListenerEvent } from '@capacitor/app';
import MainMenuScene from './scenes/MainMenu';

App.addListener("backButton", (event: BackButtonListenerEvent) => {
	console.log("back")
});

const game = new Phaser.Game(
	Object.assign(config, {
		scene: [GameScene]
	})
);