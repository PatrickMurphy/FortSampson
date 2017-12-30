var canvas; // this is the reference variable to the html Canvas element that displays the game

var levels_strings; // Used as a collection of all levels
var levels; // the level manager

var cell_size; // height width of the cells in the level (80 default)
var cell_x_count; // Count of total cells to display x axis
var cell_y_count; // count of total cells to display y axis

var t1; // Image
var t2; // Image
var t3; // Image
var t4; // Image
var bg;

var DEBUG = false; //'levelEditor'; // Debug flag, false is normal, true for bg, 'col' for collisions

var item_types;

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
	levels = new LevelManager();

	// add enums from file
	setupEnums();

	levels.addLevel(new Level(level_types.svg, {}, level_properties.FortSampsonInside_LivingRoom.title));
}

// Draw the frame, the main game loop
function draw() {
	levels.display();

	if (DEBUG === 'levelEditor') {
		drawLevelEditor();
	}
}

// Draw temporary shapes to show where items cliping would be TODO: show items and paths, start point
// 		GUI to show current tool options, p5dom to show exports and other options, delete current or new, modify existing and new
//		Allow others to create levels?
function drawLevelEditor() {
	text(level_editor_tool + ' Right Click to change', 5, 100); // display current tool
	if (level_editor_points.collisions.length >= 2) {
		for (var i = 0; i < level_editor_points.collisions.length; i += 2) {
			if (typeof level_editor_points.collisions[i + 1] !== 'undefined') {
				rect(level_editor_points.collisions[i].x, level_editor_points.collisions[i].y, level_editor_points.collisions[i + 1].x - level_editor_points.collisions[i].x, level_editor_points.collisions[i + 1].y - level_editor_points.collisions[i].y)
			}
		}
	}
}

// mouse pressed only for levelEditor for now, but later for menus
function mousePressed() {
	if (DEBUG === 'levelEditor') {
		var tools = ['collisions', 'paths', 'items'];
		console.log(mouseX, mouseY);
		if (mouseButton === RIGHT) {
			level_editor_tool = tools[(tools.indexOf(level_editor_tool) + 1) % tools.length];
		}
		if (level_editor_tool === 'collisions') {
			level_editor_points.collisions.push(createVector(mouseX, mouseY));
		}
	}
}
