import Phaser, { GameObjects, Geom } from 'phaser';
import TileFactory from '../factories/TileFactory';
import { Tile } from '../objects/Tile';
import { TileType } from '../Types/Tile';

const gridSize: number = 6;
const baseTileSide: number = Math.floor(600 / gridSize);
var tiles: Tile[] = [];

export default class Game extends Phaser.Scene {
	collisionGroup?: Phaser.Physics.Arcade.Group;
	tileFactory: TileFactory;

	isDragging: boolean = false;

	dragPoints: Array<{ x: number, y: number }> = [];
	selectedTiles: Array<Tile> = [];
	dragLine?: Phaser.GameObjects.Graphics;
	dragLinePath?: Phaser.Curves.Path;
	startingTileType?: TileType;

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

		this.events.on("replaceTile", (col: number) => {
			this.replaceTile(col);
		})

		this.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
			if (this.selectedTiles.length > 2) {
				this.selectedTiles.forEach((tile, index) => {
					tile.destroy();
				});
			}
			this.selectedTiles = [];
			this.dragPoints = [];
			this.dragLine?.destroy();
			this.dragLinePath?.destroy();
		});

		this.events.on("setStartingDragTile", (tile: Tile) => {
			console.log(`starting tile: ${tile.tileName}, coords: ${tile.x}, ${tile.y}`);
			this.startingTileType = tile.tileType;
			this.selectedTiles.push(tile);
			this.dragPoints.push({ x: tile.x, y: tile.y });
			this.dragLine = this.add.graphics();
		});

		this.events.on("draggingIntersect", (tile: Tile) => {
			if (this.selectedTiles.length < 1) return;
			if (!this.selectedTiles.some(t => t.id == tile.id)) {
				let xDistanceDiff = tile.x - this.dragPoints[this.dragPoints.length - 1].x;
            	let yDistanceDiff = tile.y - this.dragPoints[this.dragPoints.length - 1].y;
				if (yDistanceDiff > baseTileSide*1.2 || yDistanceDiff < -(baseTileSide*1.2) || xDistanceDiff > baseTileSide*1.2 || xDistanceDiff < -(baseTileSide*1.2)) {
					console.log("DISTANCE TOO LARGE");
				} else {
					this.matchLogic(tile);
					this.updateDragLine();
				}
			} else if (this.selectedTiles.length > 1 && tile.id == this.selectedTiles[this.selectedTiles.length-2].id) {
				this.updateDragLine(true);
			}
		});
	}

	update = (time: number, delta: number) => {
		if (this.input.pointer1.isDown) {
			
			
		}
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
		//console.log("REPLACE");
		var replacementTile = this.tileFactory.GenerateRandomTile(col);
		tiles.push(replacementTile);
		this.add.existing(tiles[tiles.length-1]);
		this.collisionGroup?.add(tiles[tiles.length-1]);
	}

	updateDragLine = (remove: boolean = false) => {
		if (remove) {
			this.selectedTiles.pop();
			this.dragPoints.pop();
		}
		this.dragLine?.clear();
		this.dragLine?.lineStyle(16, 0xFF11FF, 1);
		this.dragLinePath = new Phaser.Curves.Path(this.selectedTiles[0].x, this.selectedTiles[0].y);
		this.dragLinePath.splineTo(this.dragPoints.map(point => { return new Phaser.Math.Vector2(point.x,point.y) }));
		this.dragLinePath.draw(this.dragLine as Phaser.GameObjects.Graphics, 128);
	}

	matchLogic = (tile: Tile) => {
		switch(tile.tileType) {
			case "combat": if (this.startingTileType === "enemy" || this.startingTileType === "combat") {
				this.selectedTiles.push(tile);
				this.dragPoints.push({ x: tile.x, y: tile.y });
				break;
			}
			case "enemy": if (this.startingTileType === "enemy" || this.startingTileType === "combat") {
				this.selectedTiles.push(tile);
				this.dragPoints.push({ x: tile.x, y: tile.y });
				break;
			}
			case "currency": if (this.startingTileType == tile.tileType) {
				this.selectedTiles.push(tile);
				this.dragPoints.push({ x: tile.x, y: tile.y });
				break;
			}
			case "defence": if (this.startingTileType == tile.tileType) {
				this.selectedTiles.push(tile);
				this.dragPoints.push({ x: tile.x, y: tile.y });
				break;
			}
			case "healing": if (this.startingTileType == tile.tileType) {
				this.selectedTiles.push(tile);
				this.dragPoints.push({ x: tile.x, y: tile.y });
				break;
			}
		}
	}
}
