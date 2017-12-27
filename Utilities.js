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
