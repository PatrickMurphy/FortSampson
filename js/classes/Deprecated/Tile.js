/*
-------------------
Tile ID Reference
-------------------

Tile #      Collisions	Objects		Name				Description
	0		No			Yes			Air                 The basic blank tile. TODO: should these be objects? or default to background
	1		Yes			Yes			Grass Platform 1    The basic platform, dirt with grass, flat, can float or be the lowest ground.

-----------------
Tile Class
-----------------
This class is the element of each map piece
*/

class Tile {
	constructor(loc, typeID, i, items) {
		this.location = loc; // this is the x,y position in the tile map, not the display coordinates
		this.displayVector = vectorToDisplay(this.location);
		this.type = typeID; // Type id, refer to comment above
		this.type_name = tile_names[typeID];
		this.index = i; // the unique index count of this tile
		items = items || []; // array of item names, default to array
		this.items = []; // array to hold objects created items
		// TODO: the case statment to assign collisions and objects based on type. json object with properties
		for (var i = 0; i < items.length; i++) {
			this.items.push(new Item(items[i], this.displayVector.copy().add(items[i].offset)));
		}
	}

	display() {
		for (var i = 0; i < this.items.length; i++) {
			this.items[i].display();
		}

		if (this.type == 0) { // TODO: Why is this a string?
			noFill(); // air TODO: temp fix, just exit the function at this point?
		} else if (this.type == tile_types.grass.id) {
			image(t1, this.displayVector.x, this.displayVector.y); // display cell background
		}


		/*if (DEBUG === true) {
			fill(map(this.location.x, 0, cell_x_count, 0, 127.5) + map(this.location.y, 0, GAMEOBJ.cell_y_count, 0, 127.5));
			rect(cell_size * (this.location.x), this.location.y * cell_size, cell_size, cell_size);
			fill(color(255, 0, 0));
			text(vectorToIndex(this.location.x, this.location.y) + "," + this.index, (this.displayVector.x) + cell_size / 2, (this.location.y * cell_size) + cell_size / 2);
			text(this.location.x + ', ' + this.location.y + ' | ' + vectorToIndex(this.location.x, this.location.y), (this.displayVector.x - 15) + cell_size / 2, ((this.location.y * cell_size) + cell_size / 2) + 12);
		}*/
	}
}
