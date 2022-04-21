import Phaser, { GameObjects, Geom } from 'phaser';
import TileFactory from '../factories/TileFactory';
import { Tile } from '../objects/Tile';

const gridSize: number = 6;
const baseTileSide: number = Math.floor(600 / gridSize);
var tiles: Tile[] = [];

export default class Game extends Phaser.Scene {
	collisionGroup?: Phaser.Physics.Arcade.Group;
	tileFactory: TileFactory;
	constructor() {
		super('GameScene');
		this.tileFactory = new TileFactory(this);
	}

	init = () => {
				
	}

	preload = () => {
		this.load.image("coin", "assets/coin.svg");
		this.load.image("sword", "assets/gladius.svg");
		this.load.image("healthPotion", "assets/health-potion.svg");
		this.load.image("shield", "assets/shield.svg");
		this.load.image("skull", "assets/skull-white.svg");
	}

	create = () => {
		this.physics.world.checkCollision.up = false;
		this.physics.world.checkCollision.left = false;
		this.physics.world.checkCollision.right = false;
		this.physics.world.gravity.y = 3300;
		this.buildGrid();
		this.collisionGroup = this.physics.add.group({
			defaultKey: "tile",
			bounceY: 0,
			collideWorldBounds: true
		});

		this.collisionGroup.addMultiple(tiles);

		this.physics.add.collider(this.collisionGroup, this.collisionGroup, (t1, t2) => {
			var b1 = t1.body;
			var b2 = t2.body;

			if (b1.y > b2.y) {
				b2.y += (b1.top - b2.bottom);
				b2.stop();
			}
			else {
				b1.y += (b2.top - b1.bottom);
				b1.stop();
			}
		});

		this.events.on("replaceTile", (data: any) => this.replaceTile(data));
	}

	update = (time: number, delta: number) => {
		
	}

	buildUi = () => {

	}

	buildGrid = () => {
		let count = 0;
		for (let x = 0; x < gridSize; x++) {
			for (let y = 0; y < gridSize; y++) {
				var newTile = this.tileFactory.GenerateRandomTile(x, y);
				tiles.push(newTile);
				this.add.existing(tiles[count]);
				count++;
			}
		}
	}

	replaceTile = (col: number) => {
		var replacementTile = this.tileFactory.GenerateRandomTile(col);
		tiles.push(replacementTile);
		this.add.existing(tiles[tiles.length-1]);
		this.collisionGroup?.add(tiles[tiles.length-1]);
	}
}
