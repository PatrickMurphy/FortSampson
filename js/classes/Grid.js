class Grid {
	constructor(cell_size, cell_x_count, cell_y_count) {
		this.cell_size = cell_size || 80;
		this.cell_x_count = cell_x_count || 8;
		this.cell_y_count = cell_y_count || 9;
	}

	display() {}

	vectorToDisplay(vect) {
		return createVector(vect.x * this.cell_size, vect.y * this.cell_size);
	}

	displayToVector(display) {
		return createVector(Math.floor(display.x / this.cell_size), Math.floor(display.y / this.cell_size));
	}
}
