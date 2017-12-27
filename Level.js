class Level {
	constructor(typeID, parent, titleOrLevelString) {
		this.type = typeID; // Type id, refer to comment above
		this.parent = parent || undefined;
		this.collisions = new CollisionManager();
		this.items = [];
		this.background_image = createImage();
		this.cells = []; // if type = cells
		this.cell_map = undefined;
		this.title = undefined;

		if (this.type === level_types.cells) {
			this.cell_map = titleOrLevelString;
			this.loadCellLevel(this.cell_map);
		} else if (this.type === level_types.svg) {
			this.title = titleOrLevelString;
			this.loadSVGLevel(this.title);
		}
	}

	loadCellLevel(cells) {
		// Split level string to char array
		var lev = cells.split('');

		// if we have enough to display
		if (lev.length >= 80) {

			// For every char in the lvl array
			for (var i = 0; i <= lev.length; i++) {

				// Determine cell type & items
				var cell_type = lev[i] == 2 ? 1 : lev[i];
				var items_temp = lev[i] == 2 ? [item_types.rollingrock] : [];

				// Add this tile
				this.cells.push(new Tile(indexToVector(i), cell_type, i, items_temp));

				// if not air add collisions
				if (lev[i] > 0) {
					// move to tile constructor
					var loc = indexToDisplay(i);
					loc.y = loc.y + cell_size - 23;
					this.collisions.addCollision(new Collision('box', collision_types.floor, loc, createVector(cell_size, 23)));
				}
			}
		}
	}

	loadSVGLevel(level_title) {
		bg = loadImage("data\ ".trim() + level_title + '\background.svg');
	}

	copy(type) {
		return new Level(this.type, this.parent);
	}

	display() {
		background(color(191, 248, 255));
		image(this.background_image, 0, 0);
		noStroke();
		for (var x = 0; x <= cell_x_count; x++) {
			for (var y = 0; y <= cell_y_count; y++) {
				this.cells[vectorToIndex(x, y)].display();
			}
		}

		this.collisions.display();
	}
}