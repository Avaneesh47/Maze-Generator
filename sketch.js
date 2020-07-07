//variables for no. of columns,rows,width of each cell,current cell,arrays
var cols,rows;
var w = 40;
var grid = [];

var current;
var stack = [];

var player;
var topEdge,bottomEdge,rightEdge,leftEdge;

function setup() {
  //canvas
  createCanvas(600,400);

  //values for no. of columns and rows
  cols = floor(width/w);
  rows = floor(height/w);

  //creating a grid of cells and pushing each cell into the array
  for(var q = 0; q < rows; q++){
    for(var p = 0; p < cols; p++){
      var cell = new Cell(p,q);
      grid.push(cell); 
    }
  }

  //current cell 
  current = grid[0];

  //player sprite
  player = createSprite(20,20,20,20);

  //borders of the canvas so that the ball stays in the canvas
  topEdge    = createSprite(300,0,600,10);
  bottomEdge = createSprite(280,400,560,10);
  rightEdge  = createSprite(600,180,10,360);
  leftEdge   = createSprite(0,200,10,400);
}

function draw() {
  //black background
  background(0,0,0);  
  
  //loop to show all cells of the array
  for(var p = 0; p < grid.length;p++){
    grid[p].show();
  }

  //marking the current cell as visited
  current.visited = true;

  //next cell is the random neighbor of current cell
  var next = current.checkNeighbors();

  //condition to remove walls of the cells and to set the next cell as current
  if(next){
    next.visited = true;

    stack.push(current);

    removeWalls(current,next);

    current = next;
  }
  //when the cuurent cell is stuck
  else if(stack.length > 0){
    current = stack.pop();
  }

  player.bounceOff(topEdge);
  player.bounceOff(bottomEdge);
  player.bounceOff(rightEdge);
  player.bounceOff(leftEdge);

  drawSprites();
}

function index(p,q){
  if(p < 0 || q < 0 || p > cols-1 || q > rows-1){
    return -1;
  }
  return p + q*cols;
}

//function to remove walls of the random cells
function removeWalls(a,b) {
  var x = a.p - b.p;
  if(x === 1){
    a.walls[3] = false;
    b.walls[1] = false;
  }
  else if(x === -1){
    a.walls[1] = false;
    b.walls[3] = false;
  }

  var y = a.q - b.q;
  if(y === 1){
    a.walls[0] = false;
    b.walls[2] = false;
  }
  else if(y === -1){
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    player.velocityX = -3;
    player.velocityY = 0;
  }
  if(keyCode === RIGHT_ARROW){
    player.velocityX = 3;
    player.velocityY = 0;
  }
  if(keyCode === UP_ARROW){
    player.velocityX = 0;
    player.velocityY = -3;
  }
  if(keyCode === DOWN_ARROW){
    player.velocityX = 0;
    player.velocityY = 3;
  }
}