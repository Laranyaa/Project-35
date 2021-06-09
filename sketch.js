//Create variables here
var  dog,dogImg, happyDog, database, foodS, foodStock;
function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  dog = createSprite(440,395,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  database=firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  

  drawSprites();
  //add styles here
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }
  drawSprites();
    fill("red");
    textSize(20)
    text("Note: Press UP ARROW to feed Drago milk",50,20);
    text("Food: "+foodS, 200, 50);

}

function readStock(data){
 foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}


