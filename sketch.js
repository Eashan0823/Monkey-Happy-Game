//Creating sprites
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0,ground;

function preload(){
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
 
}



function setup() {
  //createCanvas(400,400);

 monkey=createSprite(80,315,20,20);
 monkey.addAnimation("moving", monkey_running);
 monkey.scale=0.1;

 ground=createSprite(400,350,900,10);
 //Moves ground to the left if x velocity is negative
 ground.velocityX=-4;
  //Creates scrolling effect
 ground.x=ground.width/2;
 FoodGroup=createGroup();
 obstacleGroup=createGroup();
 
}


function draw() {
  background("red");
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  //The monkey will jump if the space bar is pressed
if(keyDown("space")){
  //jumpSound.play();
  monkey.velocityY = -12;
}
//Adds gravity to the monkey
monkey.velocityY=monkey.velocityY+0.8;
//Makes the monkey collide with the ground so it doesn't fall off
monkey.collide(ground);
food();
obstacles();
drawSprites();
if(FoodGroup.isTouching(monkey)){
  //Destroys each banana when monkey touches banana
  FoodGroup.destroyEach();
  score=score+2;
}
stroke("white");
  textSize(20);
  fill("white");
  //Adds score by 2 when monkey touches food
  text("Score: "+ score, 200,50);
  //Game ends when obstacles touch monkey
  if(obstacleGroup.isTouching(monkey)){
      ground.velocityX = 0;
      monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  //Adds survival time text
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 10,50);
}
function food(){
  if(World.frameCount%80===0){
    banana=createSprite(600,250,60,10);
    //Randomly selects y position for banana
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
    //Sets lifetime for banana to prevent memory leaking
    banana.setLifetime=100;
    //Adds banana to food group
    FoodGroup.add(banana);
  }
}
function obstacles(){
  //Creates obstacles after frame count is 300
  if(World.frameCount%300===0){
    //x,y,width,height for obstacle
    obstacle=createSprite(800,320,40,10);
    //Adding an Image to the obstacle sprite
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    //Randomly selects a y position for obstacle
    //obstacle.y=Math.round(random(120,200));
    obstacle.velocityX=-4;
    //Sets lifetime for obstacle to prevent memory leaking
    obstacle.setLifetime=100;
    //Adds obstacle to obstacle group
    obstacleGroup.add(obstacle);
  }

}






