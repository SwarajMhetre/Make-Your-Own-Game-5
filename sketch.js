var tank,tankImg;
var pcar, pcarImg,pcarBlast;
var soilImg,grass;
var bullet, bulletImg,bulletSound;
var border1,border2,border3;
var score,resetImg,reset;
var BulletGrp, PcarGrp;

var gamestate=1

function preload(){

  tankImg = loadImage("indianTank.png");
  pcarImg = loadImage("chinaCar.png");
  soilImg = loadImage("Soil.jpg");
  bulletImg = loadImage("tankBullet.png");
  grass=loadImage("grass.jpg")
  pcarBlast= loadSound("carBlast.mp3")
  bulletSound= loadSound("tankFire.mp3")
  resetImg=loadImage("reset.png")

}

function setup() {
  createCanvas(1200,600);

 tank = createSprite(1100, 300, 50, 50);
 tank.addImage(tankImg);
 tank.scale=0.26; 

border1= createSprite(1000,300,8,450);
border1.shapeColor = 'black'

border2= createSprite(1100,526,207,8)
border2.shapeColor = 'black'

border3= createSprite(1100,74,207,8)
border3.shapeColor = 'black'

 PcarGrp = new Group();
BulletGrp= new Group();

}

function draw() {
  background(soilImg);  

  police();

  if(gamestate===1){
if(keyDown(UP_ARROW)){
  tank.y=tank.y-5;
}
 if(keyDown(DOWN_ARROW)){
   tank.y=tank.y+5
   }
   if(keyDown(LEFT_ARROW)){
    tank.x=tank.x-5;
  }
  if(keyDown(RIGHT_ARROW)){
    tank.x=tank.x+5;
  }

if(keyDown("SPACE")){
  fire();
  bulletSound.play()
}

if(PcarGrp.isTouching(BulletGrp)){
      BulletGrp.destroyEach();
      PcarGrp.destroyEach();

      pcarBlast.play()
 }
if (border1.isTouching(PcarGrp)){
   gamestate=2;
}

drawSprites();
}
if(gamestate===2){
  background("black")

  reset=createSprite(1000,200,40,40);
  reset.addImage(resetImg);

  fill("white")
  textSize(70)
  text("😯 No ! We lost 😯",300,300)
 
textSize(14)
 fill("yellow")
  text("Wanna Play this again ? JUST REFRESH !",450,570) 
}
}
function police (){
  if(frameCount%160===0){
    pcar=createSprite(0,Math.round(random(90,510)),20,20);
    pcar.velocityX=5;
    pcar.addImage(pcarImg);
    pcar.scale=0.3;
    pcar.rotation=180; 

PcarGrp.add(pcar);

pcar.depth=border1.depth;
pcar.depth=border2.depth;
pcar.depth=border3.depth;
}
}
function fire(){
  bullet=createSprite(500,300,30,30);
  bullet.addImage(bulletImg);
  bullet.x=tank.x;
  bullet.y=tank.y;
  bullet.scale=0.12;
  bullet.rotation=180;

  bullet.depth=tank.depth-1;
  
  bullet.velocityX=-14; 
bullet.lifetime=520;
  BulletGrp.add(bullet);
}