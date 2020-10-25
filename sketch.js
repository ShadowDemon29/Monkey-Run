var PLAY=1;
var END=0;
var gameState = 1;



var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(windowWidth,windowWidth)
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400,350,9000,10);
  
  score = 0

 FoodGroup = createGroup();
 obstacleGroup = createGroup();
  
}


function draw() {
  background("white")
  text("Score: "+ score,375,30)
  text("Press Up Arrow To Make The Monkey Jump And Double Press To Double Jump",200,60)
    text(" Press One Of The Rocks To Restart",280,70)
  
  if(gameState === PLAY){
     if(keyDown("up")&& monkey.y >= 100) {
        monkey.velocityY = -12;
           
     }
    monkey.velocityY = monkey.velocityY + 0.8
   
    spawnBananas();
    spawnObstacles(); 
  
  if(obstacleGroup.isTouching(monkey)){
     obstacleGroup.destroyEach();
    obstacleGroup.velocityX = 0
    monkey.destroy();
    ground.destroy();
     gameState === END
  }
      ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
  
  
  
  }
  
    
    
  else if (gameState === END){
    
   if(obstacleGroup.isTouching(monkey)){
     obstacleGroup.destroyEach();
    obsatcleGroup.velocityX = 0
    monkey.destroy();
    ground.destroy();
     gameState === END
  }
  
     if(mousePressedOver(obstacleGroup)) {
      reset();
    }
    
  }
  
  monkey.collide(ground)
  
  drawSprites();

  
}

function spawnBananas() {
  if (frameCount % 480 === 0) {
    var banana = createSprite(width+20,height-300,40,10);
    banana.y = Math.round(random(110,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 700;
    
 

    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var obstacle = createSprite(width-20,height+300,40,10);
    obstacle.y = Math.round(random(327,335));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 700;
    
    //adjust the depth

    
    //add each cloud to the group
    obstacleGroup.add(obstacle);  
  }
}
function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach(); 
  FoodGroup.destroyEach();
  score = 0;
  

}








