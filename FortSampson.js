var canvas; // this is the reference variable to the html Canvas element that displays the game

var levels; // Used as a collection of all levels
var level; // the current level object
var collision; // an x,y multidimensional array that contains bounding boxes for the cat to collide to

var cell_size; // height width of the cells in the level (80 default)
var cell_x_count; // Count of total cells to display x axis
var cell_y_count; // count of total cells to display y axis

var t1; // Image
var t2; // Image
var t3; // Image
var t4; // Image

var cat1; // Cat the player object

var DEBUG = false; //'col'; //false; // Debug flag, false is normal, true for bg, 'col' for collisions

var states = {
	idle: 0,
	moving: 1,
	jumping: 2,
	movejump: 3,
	dead: 4
};

function preload() {
	t1 = loadImage('data/tile1.png');
	t2 = loadImage('data/toby.png');
	t3 = loadImage('data/tobyr.png');
	t4 = loadImage('data/rollingrock.png');
}

function setup() {
	// HTML Canvas options
	canvas = createCanvas(800, 640, P2D);
	canvas.parent("#game");

	// Cell Size Options
	cell_size = 80;
	cell_x_count = ceil(width / cell_size);
	cell_y_count = ceil(height / cell_size);
	cell_x_count = 8;
	cell_y_count = 9;

	// Add Cat Object, Player 1
	cat1 = new Cat(createVector(0, 7), 1, 1);

	// Map Options
	level = [];
	collision = [];
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
	addLevel(0);
}


// Add a level from an ID
function addLevel(levelID) {
	var lev = levels[levelID].split('');
	if (lev.length >= 100) {
		for (var i = 0; i <= min(500, lev.length); i++) {
			level.push(new Tile(indexToVector(i), lev[i], i));
			if (lev[i] > 0) {
				var loc = indexToDisplay(i);
				loc.y = loc.y + cell_size - 23;
				addCollision(new Collision('box', loc, createVector(cell_size, 23)));
			}
		}
	}
}

// Collision Functions: Todo add collisions
function addCollision(c) {
	collision.push(c);
}

function getCollisions() {
	return collision;
}

function getCollision(id) {

}

// convert a cell sequential index to a cell vector
function indexToVector(index) {
	return createVector(floor((index) / cell_x_count), index - (floor(index / cell_x_count) * cell_x_count));
}

// convert a cell vector, xy location to an index
function vectorToIndex(x, y) {
	return x * cell_y_count + y;
}

// convert a cell vector to display vector
function vectorToDisplay(vect) {
	return createVector(vect.x * cell_size, vect.y * cell_size);
}

function indexToDisplay(index) {
	return vectorToDisplay(indexToVector(index));
}

function displayToVector(display) {
	return createVector(display.x / cell_size, display.y / cell_size);
}

function displayToIndex(display) {
	return vectorToIndex(displayToVector(display));
}

// Draw the frame, the main game loop
function draw() {
	background(color(191, 248, 255));
	noStroke();
	for (var x = 0; x <= cell_x_count; x++) {
		for (var y = 0; y < cell_y_count + 1; y++) {
			level[vectorToIndex(x, y)].display();
		}
	}

	for (var i = 0; i < collision.length; i++) {
		collision[i].display();
	}

	cat1.update();
	cat1.display();
}
