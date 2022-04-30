var C=Object.defineProperty;var P=(h,e,s)=>e in h?C(h,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):h[e]=s;var t=(h,e,s)=>(P(h,typeof e!="symbol"?e+"":e,s),s);import{P as l,p as T,F as I,A as k}from"./vendor.55cd3a4e.js";const M=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerpolicy&&(r.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?r.credentials="include":a.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}};M();const O={type:l.AUTO,parent:"game",backgroundColor:"",transparent:!0,scale:{mode:l.Scale.FIT,width:300,height:450,autoCenter:l.Scale.CENTER_BOTH},physics:{default:"matter",matter:{gravity:{y:1}}},seed:["123"]},H={fontFamily:"'Lato', sans-serif",fontSize:"2rem",stroke:"#000",strokeThickness:2};class x extends l.GameObjects.Container{constructor(e,s,i,a,r,n=16711680,c=65280,d=20,o){super(e,s,i);t(this,"width");t(this,"height");t(this,"graphicMask");t(this,"geometryMask");t(this,"background");t(this,"backgroundColor");t(this,"fill");t(this,"fillColor");t(this,"text");t(this,"max");t(this,"current");t(this,"barMax");t(this,"barCurrent");t(this,"incrementAmount");t(this,"setMax",e=>{this.max=e,this.incrementAmount=this.width/this.max,this.barMax=this.incrementAmount*this.max,this.barCurrent=this.current*this.incrementAmount,this.text.text=`${this.current}/${this.max}`,this.scene.tweens.add({targets:this.fill,props:{width:{value:`${this.current*this.incrementAmount}`,duration:300,ease:"Power2"}}})});t(this,"setProgress",e=>{this.current=e,this.barCurrent=e*this.incrementAmount,this.text.text=`${this.current}/${this.max}`,this.scene.tweens.add({targets:this.fill,props:{width:{value:`${this.barCurrent}`,duration:300,ease:"Power2"}}})});t(this,"increaseProgress",e=>{this.current+=e,this.barCurrent+=e*this.incrementAmount,this.text.text=`${this.current}/${this.max}`,this.scene.tweens.add({targets:this.fill,props:{width:{value:`+=${e*this.incrementAmount}`,duration:300,ease:"Power2"}}})});t(this,"decreaseProgress",e=>{this.current-=e,this.barCurrent-=e*this.incrementAmount,this.text.text=`${this.current}/${this.max}`,this.scene.tweens.add({targets:this.fill,props:{width:{value:`-=${e*this.incrementAmount}`,duration:300,ease:"Power2"}}})});this.width=a,this.height=r,this.backgroundColor=n,this.fillColor=c,this.max=d,this.current=o!=null?o:d,this.incrementAmount=a/this.max,this.barMax=this.incrementAmount*this.max,this.barCurrent=this.current*this.incrementAmount,this.graphicMask=new l.GameObjects.Graphics(e).fillRoundedRect(s,i,a,r,10),this.add(this.graphicMask),this.geometryMask=new T.exports.Display.Masks.GeometryMask(e,this.graphicMask),this.setMask(this.geometryMask),this.background=new l.GameObjects.Rectangle(e,0,0,a,r,n).setOrigin(0),this.add(this.background),this.fill=new l.GameObjects.Rectangle(e,0,0,this.barCurrent,r,c).setOrigin(0),this.add(this.fill),this.text=new l.GameObjects.Text(e,a/2,r/2,`${this.current}/${this.max}`,H).setOrigin(.5),this.add(this.text)}}const b=6,m=Math.floor(300/b);class p extends l.GameObjects.Container{constructor(e,s,i,a,r){super(e,i+m/4,a);t(this,"id");t(this,"column");t(this,"intersector");t(this,"intersectoryOverlay");t(this,"shouldAnimate",!1);t(this,"pointerDownFunc",(e,s,i,a)=>{l.Geom.Circle.ContainsPoint(new l.Geom.Circle(this.x,this.y,Math.floor(m/2*.8)),e)&&this.scene.events.emit("setStartingDragTile",this)});t(this,"pointerMoveFunc",(e,s,i,a)=>{l.Geom.Circle.ContainsPoint(new l.Geom.Circle(this.x,this.y,Math.floor(m/2*.8)),e)&&this.scene.events.emit("draggingIntersect",this)});t(this,"pointerUpFunc",(e,s,i,a)=>{});t(this,"onSetDim",()=>{this.alpha=.3});t(this,"onUnsetDim",()=>{this.alpha=1});this.setSize(m,m),this.on("pointerup",this.pointerUpFunc),this.on("pointerdown",this.pointerDownFunc),this.on("pointermove",this.pointerMoveFunc),this.on("dim",this.onSetDim),this.on("undim",this.onUnsetDim),this.setInteractive(),this.id=s,this.column=r;const n=new T.exports.Display.Masks.GeometryMask(this.scene,this.scene.children.getByName("container-mask"));this.setMask(n)}}const w=["combat","currency","healing","defence","enemy"],y=h=>h.tileType==="enemy",A=h=>h.tileType==="healing",D=h=>h.tileType==="currency",G=h=>h.tileType==="combat",L=h=>h.tileType==="defence",F=6,v=Math.floor(300/F);class u extends Phaser.GameObjects.Sprite{constructor(e,s){super(e,0,0,s);this.setOrigin(0),this.setDisplaySize(v,v)}}const j={fontFamily:"'Lato', sans-serif",fontSize:"1.5rem",stroke:"#000",strokeThickness:5};class R extends p{constructor(e){super(e.scene,e.id,e.x,e.y,e.column);t(this,"tileType","enemy");t(this,"tileName","skull");t(this,"maxHp");t(this,"level");t(this,"xpReward");t(this,"damage");t(this,"spawnedThisTurn");t(this,"sprite");t(this,"text");t(this,"destroy",()=>new Promise((e,s)=>{var r,n;let i=this.scene.add.sprite(this.x,this.y,this.tileName);i.displayHeight=this.height,i.displayWidth=this.width;const a=this.scene;super.destroy(),a.tweens.add({targets:i,props:{x:{value:(r=a.xpIcon)==null?void 0:r.x,duration:400,ease:"Sine"},y:{value:(n=a.xpIcon)==null?void 0:n.y,duration:400,ease:"Power2"},scale:{value:.1,duration:400,ease:"Power2"}},onComplete:(c,d)=>(d.forEach(o=>o.destroy()),e())})}));t(this,"attackAnimation",e=>new Promise((s,i)=>{this.bringToTop(this.sprite),this.bringToTop(this.text),this.scene.tweens.add({targets:[this.sprite,this.text],ease:"Quint.easeInOut",duration:150,props:{y:{value:"-=50"}},yoyo:!0,onComplete:()=>s()})}));this.maxHp=5,this.level=3,this.xpReward=4,this.damage=1,this.spawnedThisTurn=!0,this.setDataEnabled(),this.data.set("currentHp",5),this.sprite=new u(e.scene,this.tileName),this.sprite.setOrigin(.5),this.add(this.sprite),this.text=new l.GameObjects.Text(e.scene,-this.displayOriginX,this.displayOriginY/2-5,`${this.currentHp}`,j),this.text.setDepth(100),this.add(this.text),this.data.events.on("changedata-currentHp",()=>{this.text.text=`${this.currentHp}`})}get currentHp(){return this.data.get("currentHp")}set currentHp(e){this.data.set("currentHp",e)}}class $ extends p{constructor(e){super(e.scene,e.id,e.x,e.y,e.column);t(this,"tileType","combat");t(this,"tileName","sword");t(this,"damage");t(this,"sprite");this.damage=1,this.sprite=new u(e.scene,this.tileName),this.sprite.setOrigin(.5),this.add(this.sprite)}}class N extends p{constructor(e){super(e.scene,e.id,e.x,e.y,e.column);t(this,"tileType","healing");t(this,"tileName","healthPotion");t(this,"healAmount");t(this,"sprite");t(this,"destroy",()=>new Promise((e,s)=>{var r,n;let i=this.scene.add.sprite(this.x,this.y,this.tileName);i.displayHeight=this.height,i.displayWidth=this.width;const a=this.scene;super.destroy(),a.tweens.add({targets:i,props:{x:{value:(r=a.healthIcon)==null?void 0:r.x,duration:400,ease:"Sine"},y:{value:(n=a.healthIcon)==null?void 0:n.y,duration:400,ease:"Power2"},scale:{value:.1,duration:400,ease:"Power2"}},onComplete:(c,d)=>(d.forEach(o=>o.destroy()),e())})}));this.healAmount=2,this.sprite=new u(e.scene,this.tileName),this.sprite.setOrigin(.5),this.add(this.sprite)}}class E extends p{constructor(e){super(e.scene,e.id,e.x,e.y,e.column);t(this,"tileType","defence");t(this,"tileName","shield");t(this,"defenceMod");t(this,"sprite");t(this,"destroy",()=>new Promise((e,s)=>{var r,n;let i=this.scene.add.sprite(this.x,this.y,this.tileName);i.displayHeight=this.height,i.displayWidth=this.width;const a=this.scene;super.destroy(),a.tweens.add({targets:i,props:{x:{value:(r=a.defenceIcon)==null?void 0:r.x,duration:400,ease:"Sine"},y:{value:(n=a.defenceIcon)==null?void 0:n.y,duration:400,ease:"Power2"},scale:{value:.1,duration:400,ease:"Power2"}},onComplete:(c,d)=>(d.forEach(o=>o.destroy()),e())})}));this.defenceMod=1,this.sprite=new u(e.scene,this.tileName),this.sprite.setOrigin(.5),this.add(this.sprite)}}class B extends p{constructor(e){super(e.scene,e.id,e.x,e.y,e.column);t(this,"tileType","currency");t(this,"tileName","coin");t(this,"goldValue");t(this,"sprite");t(this,"destroy",()=>new Promise((e,s)=>{var r,n;let i=this.scene.add.sprite(this.x,this.y,this.tileName);i.displayHeight=this.height,i.displayWidth=this.width;const a=this.scene;super.destroy(),a.tweens.add({targets:i,props:{x:{value:(r=a.goldIcon)==null?void 0:r.x,duration:400,ease:"Sine"},y:{value:(n=a.goldIcon)==null?void 0:n.y,duration:400,ease:"Power2"},scale:{value:.1,duration:400,ease:"Power2"}},onComplete:(c,d)=>(d.forEach(o=>o.destroy()),e())})}));this.goldValue=T.exports.Math.Between(1,6),this.sprite=new u(e.scene,this.tileName),this.sprite.setOrigin(.5),this.add(this.sprite)}}const _=6,X=Math.floor(300/_);class z{constructor(e){t(this,"scene");t(this,"currentDelta",0);t(this,"GenerateRandomTile",(e,s=200)=>{this.currentDelta++;const i=w[l.Math.RND.between(0,w.length-1)],a=new p(this.scene,this.currentDelta,e*X,s,e);switch(i){case"enemy":return new R(a);case"combat":return new $(a);case"healing":return new N(a);case"defence":return new E(a);case"currency":return new B(a);default:throw new Error("INVALID TILE TYPE :(")}});this.scene=e}}class W extends I{constructor(e){super();t(this,"game");t(this,"tilesToRemove");t(this,"next_playerTurn",()=>"tileActions");t(this,"enter_playerTurn",()=>{console.log(this.game.tiles.length)});t(this,"exit_playerTurn",()=>{});t(this,"next_tileActions",()=>"removeAndReplaceTile");t(this,"enter_tileActions",()=>{const e=this.game.selectedTiles.filter(s=>s.tileType=="combat").length;this.game.selectedTiles.forEach((s,i)=>{y(s)&&(s.currentHp-=e+this.game.playerDamage,s.currentHp<=0&&(this.game.playerXp+=s.xpReward,this.tilesToRemove.push(s))),A(s)&&(this.game.playerCurrentHp+=s.healAmount,this.game.playerCurrentHp>this.game.playerHp?this.game.playerCurrentHp=this.game.playerHp:s.shouldAnimate=!0,this.tilesToRemove.push(s)),G(s)&&this.tilesToRemove.push(s),D(s)&&(this.game.playerGold+=s.goldValue,s.shouldAnimate=!0,this.tilesToRemove.push(s)),L(s)&&(this.game.playerCurrentShield+=s.defenceMod,this.game.playerCurrentShield>this.game.playerShield?this.game.playerCurrentShield=this.game.playerShield:s.shouldAnimate=!0,this.tilesToRemove.push(s))}),this.next()});t(this,"exit_tileActions",()=>{});t(this,"next_removeAndReplaceTile",()=>"enemyTurn");t(this,"enter_removeAndReplaceTile",async()=>{const e=[];this.tilesToRemove.forEach(async(s,i)=>{this.game.tiles=[...this.game.tiles.filter(r=>r.id!==s.id)],e.push(s.destroy());var a=this.game.tileFactory.GenerateRandomTile(s.column);this.game.tiles.push(a),this.game.add.existing(this.game.tiles[this.game.tiles.length-1]),this.game.matter.add.gameObject(this.game.tiles[this.game.tiles.length-1])}),await Promise.all(e),this.next()});t(this,"exit_removeAndReplaceTile",()=>{this.tilesToRemove=[]});t(this,"next_enemyTurn",()=>"playerTurn");t(this,"enter_enemyTurn",async()=>{var s;let e=[];((s=this.game.tiles)==null?void 0:s.some(i=>y(i)))&&this.game.tiles.filter(a=>y(a)).forEach((a,r)=>{const n=a;if(n.spawnedThisTurn){n.spawnedThisTurn=!1;return}if(e.push(n.attackAnimation()),this.game.playerCurrentShield>0){this.game.playerCurrentShield-=1;return}this.game.playerCurrentHp-=n.damage}),await Promise.all(e),this.next()});t(this,"exit_enemyTurn",()=>{});this.game=e,this.tilesToRemove=[]}}const S={fontFamily:"'Lato', sans-serif",fontSize:"2rem",stroke:"#000",strokeThickness:2},f=6,g=Math.floor(300/f);class U extends l.Scene{constructor(){super("GameScene");t(this,"state");t(this,"collisionGroup");t(this,"tileFactory");t(this,"isDragging",!1);t(this,"dragPoints",[]);t(this,"selectedTiles",[]);t(this,"dragLine");t(this,"dragLineFill");t(this,"dragLinePath");t(this,"startingTileType");t(this,"tiles",[]);t(this,"tileBoxGraphic");t(this,"healthBar");t(this,"healthIcon");t(this,"defenceBar");t(this,"defenceIcon");t(this,"goldText");t(this,"goldIcon");t(this,"xpText");t(this,"xpIcon");t(this,"init",()=>{this.initializeDataAccessors()});t(this,"preload",()=>{this.load.image("coin","assets/coin.svg"),this.load.image("sword","assets/gladius.svg"),this.load.image("healthPotion","assets/health-potion.svg"),this.load.image("shield","assets/shield.svg"),this.load.image("skull","assets/skull-white.svg"),this.load.image("healthCross","assets/health-cross.svg"),this.load.image("xpIcon","assets/xp-icon.svg"),this.load.image("defenceIcon","assets/defence-icon.svg"),this.load.image("moneyBag","assets/money-bag.svg"),this.load.spritesheet("slash","assets/slashes_meme.png",{frameWidth:64,frameHeight:64})});t(this,"create",()=>{this.state=new W(this),this.state.on("statechange",e=>console.log(e.state)),this.buildUi(),this.buildGrid(),this.registerCollisions(),this.registerHandlers(),this.registerAnimations(),this.state.start("playerTurn")});t(this,"buildUi",()=>{this.healthBar=new x(this,20,20,Math.floor(this.sys.canvas.width/2),50,2600544,3066993),this.add.existing(this.healthBar),this.healthIcon=this.add.sprite(Math.floor(this.sys.canvas.width/2)+50,45,"healthCross").setOrigin(.5).setTintFill(2600544),this.healthIcon.displayWidth=45,this.healthIcon.displayHeight=45,this.healthIcon.name="healthIcon",this.defenceBar=new x(this,20,90,Math.floor(this.sys.canvas.width/2),50,2719929,3447003,10),this.add.existing(this.defenceBar),this.defenceIcon=this.add.sprite(Math.floor(this.sys.canvas.width/2)+50,115,"defenceIcon").setOrigin(.5).setTintFill(2719929),this.defenceIcon.displayWidth=45,this.defenceIcon.displayHeight=45,this.defenceIcon.name="defenceIcon",this.goldText=new l.GameObjects.Text(this,60,150,`${this.data.get("playerGold")}`,S),this.add.existing(this.goldText),this.goldIcon=new l.GameObjects.Sprite(this,20,150,"moneyBag").setOrigin(0).setTintFill(15965202),this.add.existing(this.goldIcon),this.goldIcon.displayWidth=45,this.goldIcon.displayHeight=45,this.goldIcon.name="goldIcon",this.xpText=new l.GameObjects.Text(this,60+Math.floor(this.sys.canvas.width/4),150,`${this.data.get("playerXp")}`,S),this.add.existing(this.xpText),this.xpIcon=new l.GameObjects.Sprite(this,20+Math.floor(this.sys.canvas.width/4),150,"xpIcon").setOrigin(0).setTintFill(12597547),this.add.existing(this.xpIcon),this.xpIcon.displayWidth=45,this.xpIcon.displayHeight=45,this.xpIcon.name="xpIcon",this.tileBoxGraphic=new l.GameObjects.Rectangle(this,0,150,g*6,g*6,2899536).setOrigin(0).setDepth(-1).setName("container-mask"),this.add.existing(this.tileBoxGraphic)});t(this,"buildGrid",()=>{let e=0;for(let i=0;i<f;i++)for(let a=0;a<f;a++){var s=this.tileFactory.GenerateRandomTile(i,a);y(s)&&(s.spawnedThisTurn=!1),this.tiles.push(s),this.add.existing(this.tiles[e]),e++}});t(this,"updateDragLine",(e=!1)=>{var s,i,a,r;e&&(this.selectedTiles.pop(),this.dragPoints.pop()),(s=this.dragLine)==null||s.clear(),(i=this.dragLine)==null||i.lineStyle(16,0,1),(a=this.dragLineFill)==null||a.clear(),(r=this.dragLineFill)==null||r.lineStyle(8,16777215,1),this.dragLinePath=new l.Curves.Path(this.selectedTiles[0].x,this.selectedTiles[0].y),this.dragLinePath.splineTo(this.dragPoints.map(n=>new l.Math.Vector2(n.x,n.y))),this.dragLinePath.draw(this.dragLine,128),this.dragLinePath.draw(this.dragLineFill,128)});t(this,"dimTiles",e=>{this.checkMatchingTileType(e)&&this.tiles.filter(s=>!this.checkMatchingTileType(s.tileType)).forEach((s,i)=>s.emit("dim"))});t(this,"undimTiles",e=>{this.checkMatchingTileType(e)&&this.tiles.filter(s=>!this.checkMatchingTileType(s.tileType)).forEach((s,i)=>s.emit("undim"))});t(this,"initializeDataAccessors",()=>{this.data.set("playerHp",20),this.events.on("changedata-playerHp",(e,s)=>{var i;(i=this.healthBar)==null||i.setMax(s)}),this.data.set("playerCurrentHp",20),this.events.on("changedata-playerCurrentHp",(e,s)=>{var i;(i=this.healthBar)==null||i.setProgress(s)}),this.data.set("playerShield",10),this.events.on("changedata-playerShield",(e,s)=>{var i;(i=this.defenceBar)==null||i.setMax(s)}),this.data.set("playerCurrentShield",10),this.events.on("changedata-playerCurrentShield",(e,s)=>{var i;(i=this.defenceBar)==null||i.setProgress(s)}),this.data.set("playerXp",0),this.events.on("changedata-playerXp",(e,s)=>{var i;(i=this.xpText)==null||i.setText(s.toString())}),this.data.set("playerGold",0),this.events.on("changedata-playerGold",(e,s)=>{var i;(i=this.goldText)==null||i.setText(s.toString())}),this.data.set("playerLevel",1),this.data.set("playerDamage",1)});t(this,"registerCollisions",()=>{this.matter.world.setBounds(),this.matter.world.engine.positionIterations=30,this.matter.world.engine.velocityIterations=30,this.tiles.forEach((e,s)=>{this.matter.add.gameObject(e)})});t(this,"registerHandlers",()=>{this.events.on("setStartingDragTile",e=>{var s;((s=this.state)==null?void 0:s.state)==="playerTurn"&&(this.startingTileType=e.tileType,this.selectedTiles.push(e),this.dragPoints.push({x:e.x,y:e.y}),this.dragLine=this.add.graphics(),this.dragLineFill=this.add.graphics(),this.dimTiles(this.startingTileType))}),this.events.on("draggingIntersect",e=>{var s;if(((s=this.state)==null?void 0:s.state)==="playerTurn"){if(this.selectedTiles.length<1)return;if(this.selectedTiles.some(i=>i.id==e.id))this.selectedTiles.length>1&&e.id==this.selectedTiles[this.selectedTiles.length-2].id&&this.updateDragLine(!0);else{let i=e.x-this.dragPoints[this.dragPoints.length-1].x,a=e.y-this.dragPoints[this.dragPoints.length-1].y;a>g*1.2||a<-(g*1.2)||i>g*1.2||i<-(g*1.2)?console.log("DISTANCE TOO LARGE"):(this.checkIntersectedTile(e),this.updateDragLine())}}}),this.input.on("pointerup",e=>{var s,i,a,r,n;((s=this.state)==null?void 0:s.state)==="playerTurn"&&(this.selectedTiles.length>2&&((i=this.state)==null||i.next()),this.selectedTiles=[],this.dragPoints=[],(a=this.dragLine)==null||a.destroy(),(r=this.dragLinePath)==null||r.destroy(),(n=this.dragLineFill)==null||n.destroy(),this.undimTiles(this.startingTileType))})});t(this,"registerAnimations",()=>{this.anims.create({key:"slash",frames:this.anims.generateFrameNumbers("slash",{frames:[0,1,2,3,4,5,6,7,8]})})});t(this,"checkMatchingTileType",e=>{switch(e){case"combat":if(this.startingTileType==="enemy"||this.startingTileType==="combat")return!0;case"enemy":if(this.startingTileType==="enemy"||this.startingTileType==="combat")return!0;case"currency":if(this.startingTileType==e)return!0;case"defence":if(this.startingTileType==e)return!0;case"healing":if(this.startingTileType==e)return!0}});t(this,"checkIntersectedTile",e=>{this.checkMatchingTileType(e.tileType)&&(this.selectedTiles.push(e),this.dragPoints.push({x:e.x,y:e.y}))});this.tileFactory=new z(this)}get playerHp(){return this.data.get("playerHp")}set playerHp(e){this.data.set("playerHp",e)}get playerCurrentHp(){return this.data.get("playerCurrentHp")}set playerCurrentHp(e){this.data.set("playerCurrentHp",e)}get playerShield(){return this.data.get("playerShield")}set playerShield(e){this.data.set("playerShield",e)}get playerCurrentShield(){return this.data.get("playerCurrentShield")}set playerCurrentShield(e){this.data.set("playerCurrentShield",e)}get playerXp(){return this.data.get("playerXp")}set playerXp(e){this.data.set("playerXp",e)}get playerLevel(){return this.data.get("playerLevel")}set playerLevel(e){this.data.set("playerLevel",e)}get playerDamage(){return this.data.get("playerDamage")}set playerDamage(e){this.data.set("playerDamage",e)}get playerGold(){return this.data.get("playerGold")}set playerGold(e){this.data.set("playerGold",e)}}k.addListener("backButton",h=>{console.log("back")});new l.Game(Object.assign(O,{scene:[U]}));
