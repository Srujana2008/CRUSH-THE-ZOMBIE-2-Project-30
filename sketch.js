const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;

var stones = [];

function preload(){
  bg_img = loadImage("assets/background.png");
  zombie1 = loadImage("assets/zombie1.png");
  zombie2 = loadImage("assets/zombie2.png");
  zombie3 = loadImage("assets/zombie3.png");
  zombie4 = loadImage("assets/zombie4.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  breakButton = createImg('assets/axe.png');
  breakButton.position(width - 130, height/2 - 10);
  breakButton.size(100,80);
  breakButton.mouseClicked(handleButtonPress);

  ground = new Base(0, height - 10, width * 2, 20, "#795548", true);
  leftWall = new Base(10, height / 2, 350, 100, "#8d6e63", true);
  rightWall = new Base(width - 10, height / 2 , 350, 100, "#8d6e63", true);

  bridge = new Bridge(28, { x: 70, y: height / 2 - 50});
  jointPoint = new Base(width - 160, height / 2 - 70 + 10, 40, 20, "#8d6e63", true);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-100, 100);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

  zombie = createSprite(width/2, height - 110, 20, 20);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

}

function draw() {
  background(bg_img);
  Engine.update(engine);

  //ground.show();
  bridge.show();
  //leftWall.show();
  //rightWall.show();

  for (var stone of stones) {
    stone.show();
  }

  if(zombie.position.x > width-200){
    zombie.velocityX = -10;
    zombie.changeAnimation("righttoleft");
  }

  if(zombie.position.x < 200){
    zombie.velocityX = 10;
    zombie.changeAnimation("lefttoright");
  }

  drawSprites();
}

function handleButtonPress(){
  jointLink.detach();
  setTimeout(() =>{
    bridge.break();
  }, 1500);
}