var canvas; // this is the reference variable to the html Canvas element that displays the game

var t2; // Image
var t3; // Image
var t4; // Image
var bg, menuBG, menuFG;

var GAMEOBJ;

function preload() {
	t2 = loadImage('data/toby.png');
	t3 = loadImage('data/tobyr.png');
	t4 = loadImage('data/rollingrock.svg');
	bg = loadImage('data/Level1Outside.svg');
	menuBG = loadImage('data/MenuBG.svg');
	menuFG = loadImage('data/MenuFG.svg');
}

function setup() {
	// HTML Canvas options
	canvas = createCanvas(800, 640, P2D);
	canvas.parent("#game");

	textAlign(CENTER);

	// add enums from file
	setupEnums();

	GAMEOBJ = new Game();
}

// Draw the frame, the main game loop
function draw() {
	GAMEOBJ.display();
}

// mouse pressed only for levelEditor for now, but later for menus
function mousePressed() {
	GAMEOBJ.handleClicks();
}
