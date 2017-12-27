var canvas; // this is the reference variable to the html Canvas element that displays the game

var levels; // Used as a collection of all levels
var level; // the current level object
var collision_manager;

var cell_size; // height width of the cells in the level (80 default)
var cell_x_count; // Count of total cells to display x axis
var cell_y_count; // count of total cells to display y axis

var t1; // Image
var t2; // Image
var t3; // Image
var t4; // Image
var bg;

var cat1; // Cat the player object

var DEBUG = false; //'levelEditor'; // Debug flag, false is normal, true for bg, 'col' for collisions

var item_types;
var firstFrame = true;

var level_editor_tool = 'collisions'; // items, collisions, paths
var level_editor_points = {
	items: [],
	paths: [],
	collisions: []
};

function preload() {
	//t1 = loadImage('data/tile1.png');
	t1 = createImage();
	t2 = loadImage('data/toby.png');
	t3 = loadImage('data/tobyr.png');
	t4 = loadImage('data/rollingrock.svg');
	bg = loadImage('data/Level1Outside.svg');
}

function setup() {
	// HTML Canvas options
	canvas = createCanvas(800, 640, P2D);
	canvas.parent("#game");

	// Cell Size Options
	cell_size = 80;
	cell_x_count = ceil(width / cell_size);
	cell_y_count = ceil(height / cell_size);
	cell_x_count = 8; // zero based less than equal = 10, (0,1,2,3,4,5,6,7,8,9)
	cell_y_count = 9; // zero based equal + 1 ()

	// Map Options
	level = [];
	levels = ["00000001" +
			  "00000001" +
			  "00000001" +
			  "00000001" +
			  "00000001" +
			  "00000001" +
			  "00000002" +
			  "00000001" +
			  "00000002" +
			  "00000001" +
			  "00000002" +
			  "00000001" +
			  "00000001" +
			  "00000001" +
			  "00000001"];

	// add enums
	setupEnums();

	collision_manager = new CollisionManager();

	// Add Cat Object, Player 1
	cat1 = new Cat(createVector(0, 7), 1, 1);

	// setup level
	addLevel(0);
}

function setupEnums() {
	item_types = {
		rollingrock: {
			id: 0,
			string_id: 'rollingrock',
			title: 'Rolling Rock',
			image: t4,
			offset: createVector(30, 0)
		},
		path: {
			id: 1,
			string_id: 'path',
			title: 'path',
			image: t4,
			offset: createVector(15, 0)
		}
	};
}


// Add a level from an ID
function addLevel(levelID) {
	// Split level string to char array
	var lev = levels[levelID].split('');

	// if we have enough to display
	if (lev.length >= 80) {

		// For every char in the lvl array
		for (var i = 0; i <= lev.length; i++) {

			// Determine cell type & items
			var cell_type = lev[i] == 2 ? 1 : lev[i];
			var items_temp = lev[i] == 2 ? [item_types.rollingrock] : [];

			// Add this tile
			level.push(new Tile(indexToVector(i), cell_type, i, items_temp));

			// if not air add collisions
			if (lev[i] > 0) {
				// move to tile constructor
				var loc = indexToDisplay(i);
				loc.y = loc.y + cell_size - 23;
				collision_manager.addCollision(new Collision('box', collision_types.floor, loc, createVector(cell_size, 23)));
			}
		}
	}
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
	return createVector(Math.floor(display.x / cell_size), Math.floor(display.y / cell_size));
}

function displayToIndex(display) {
	return vectorToIndex(displayToVector(display));
}

function mousePressed() {
	if (DEBUG === 'levelEditor') {
		console.log(mouseX, mouseY);
		if (level_editor_tool === 'collisions') {
			level_editor_points.collisions.push(createVector(mouseX, mouseY));
		}
	}
}

// Draw the frame, the main game loop
function draw() {
	background(color(191, 248, 255));
	image(bg, 0, 0);
	noStroke();
	for (var x = 0; x <= cell_x_count; x++) {
		for (var y = 0; y <= cell_y_count; y++) {
			level[vectorToIndex(x, y)].display();
		}
	}

	collision_manager.display();

	cat1.update();
	cat1.display();
	firstFrame = false;

	if (DEBUG === 'levelEditor') {
		if (level_editor_points.collisions.length >= 2) {
			for (var i = 0; i < level_editor_points.collisions.length; i += 2) {
				if (typeof level_editor_points.collisions[i + 1] !== 'undefined') {
					rect(level_editor_points.collisions[i].x, level_editor_points.collisions[i].y, level_editor_points.collisions[i + 1].x - level_editor_points.collisions[i].x, level_editor_points.collisions[i + 1].y - level_editor_points.collisions[i].y)
				}
			}
		}
	}
}
