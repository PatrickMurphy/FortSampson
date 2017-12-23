var level; // the current level
var cell_size; // height width of the cells in the level (80 default)
var canvas; // this is the reference variable to the html Canvas element that displays the game
var cell_x_count;
var cell_y_count;
var t1;
var t2;
var cat1;
var t3;
var t4;
var levels; //
var collision; // an x,y multidimensional array that contains bounding boxes for the cat to collide to
var DEBUG = false;

function preload() {
    t1 = loadImage('data/tile1.png');
    t2 = loadImage('data/toby.png');
    t3 = loadImage('data/tobyr.png');
    t4 = loadImage('data/rollingrock.png');
}

function setup() {
    canvas = createCanvas(800, 640, P2D);
    canvas.parent("#game");
    cell_size = 80;
    cell_x_count = ceil(width / cell_size);
    cell_y_count = ceil(height / cell_size);

    cat1 = new Cat(createVector(0, 7), 1, 1);

    cell_x_count = 8;
    cell_y_count = 9;
    level = [];
     addLevel(0);
    levels = [];
    collision = [];
}



function addLevel(levelID) {
    levels = ["00000001" +
  "00000001" +
  "00000001" +
  "00000021" +
  "00000201" +
  "00000201" +
  "00000102" +
  "00000201" +
  "00000002" +
  "00000001" +
  "00000002" +
  "00000001" +
  "00000001" +
  "00000001" +
  "00000001"];
    var lev = levels[levelID].split('');
    if (lev.length >= 100) {
        for (var i = 0; i <= min(500, lev.length); i++) {
            level.push(new Tile(indexToVector(i), lev[i], i));
        }
    }
}

function addCollision(c){
    collision.push(c);
}
function getCollisions(){
    return collision;
}
function getCollision(id){

}

function indexToVector(index) {
    return createVector(floor((index) / cell_x_count), index - (floor(index / cell_x_count) * cell_x_count));
}

function vectorToIndex(x, y) {
    return x * cell_y_count + y;
}

function draw() {
    background(color(191, 248, 255));
    noStroke();
    for (var x = 0; x <= cell_x_count; x++) {
        for (var y = 0; y < cell_y_count + 1; y++) {
            level[vectorToIndex(x, y)].display();
        }
    }
    cat1.update();
    cat1.display();
}

function keyPressed(){
  if (keyCode === LEFT_ARROW) {
    cat1.moveLeft();
  } else if (keyCode === RIGHT_ARROW) {
    cat1.moveRight();
  }else if(keyCode === UP_ARROW){
      cat1.moveUp();
  }
}
