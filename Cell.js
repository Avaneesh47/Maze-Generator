//class for cells
function Cell(p,q){
    this.p = p;
    this.q = q;
    this.walls = [true,true,true,true];
    this.visited = false;
  
  //function to display 4 walls of each cell  
  this.show = function(){
    var x = this.p*w;
    var y = this.q*w;

    stroke(255);
    strokeWeight(4);
  
    if(this.walls[0]){
        line(x,y,x+w,y);
        //var wall = createSprite(x+w/2,y,40,5);
    }
    if(this.walls[1]){
        line(x+w,y,x+w,y+w);
        //var wall = createSprite(x+w,y+w/2,40,5);
    }
    if(this.walls[2]){
        line(x+w,y+w,x,y+w);
        //var wall = createSprite(x+w/2,y+w,40,5);
    }
    if(this.walls[3]){
        line(x,y+w,x,y);
        //var wall = createSprite(x+w,y+w/2,40,5);
    }
    
    //if a cell has been visited fill it with a color
    if(this.visited){
        noStroke();
        fill("black");
        rect(x,y,w,w);
    }
  };

  //function to check and pick a random cell from the cell's surrounding
  this.checkNeighbors = function(){
    var neighbors = [];
    
    var top = grid[index(p,q-1)];
    var right = grid[index(p+1,q)];
    var bottom = grid[index(p,q+1)];
    var left = grid[index(p-1,q)];
  
    if(top && !top.visited){
        neighbors.push(top);
    }
    if(right && !right.visited){
        neighbors.push(right);
    }
    if(bottom && !bottom.visited){
        neighbors.push(bottom);
    }
    if(left && !left.visited){
        neighbors.push(left);
    }
  
    if(neighbors.length > 0){
        var r = floor(random(0 , neighbors.length));
        return neighbors[r];
    }
    else{
        return undefined;
    }
  };
}