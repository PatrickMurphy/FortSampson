var canvas; // this is the reference variable to the html Canvas element that displays the game

var level_manager; // the level manager
var level_editor;

var cell_size; // height width of the cells in the level (80 default)
var cell_x_count; // Count of total cells to display x axis
var cell_y_count; // count of total cells to display y axis

var t1; // Image
var t2; // Image
var t3; // Image
var t4; // Image
var bg;

var DEBUG = false; //'levelEditor'; // Debug flag, false is normal, true for bg, 'col' for collisions

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
	level_manager = new LevelManager();

	// add enums from file
	setupEnums();
	if (DEBUG === 'levelEditor') {
		level_editor = new LevelEditor();
	}

	level_manager.addLevel(level_manager.initializeLevel(level_properties.FortSampsonInside_LivingRoom));
}

// Draw the frame, the main game loop
function draw() {
	level_manager.display();

	if (DEBUG === 'levelEditor') {
		level_editor.display();
	}
}

// mouse pressed only for levelEditor for now, but later for menus
function mousePressed() {
	if (DEBUG === 'levelEditor') {
		level_editor.handleClick();
	}
}
