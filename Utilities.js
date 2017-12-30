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

function printPoints() {
	var string_out = '';
	for (var i = 0; i < level_editor_points.collisions.length; i++) {
		string_out += '{x:' + Math.round(level_editor_points.collisions[i].x) + ',y:' + Math.round(level_editor_points.collisions[i].y) + '},';
	}
	console.log(string_out);
}

function isDefined(testVariable) {
	return (typeof testVariable !== 'undefined'); // if the variable is not undefined return true
}
