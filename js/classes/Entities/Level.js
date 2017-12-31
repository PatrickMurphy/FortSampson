class Level {
	constructor(typeID, parent, titleOrLevelString) {
		this.type = typeID; // Type id, refer to comment above
		this.parent = parent || undefined;
		this.collisions = new CollisionManager(this);
		this.items = [];
		this.background_image = createImage();
		this.title = undefined;

		this.title = titleOrLevelString;
		this.loadSVGLevel(this.title);

		// Add Cat Object, Player 1
		this.player_cat = new Cat(level_properties[this.title].playerStart, this);
	}

	loadSVGLevel(level_title) {
		this.background_image = loadImage("data/levels" + '/' + level_title + '/background.svg');

		// add collision boxes : TODO: use a object that has the 2 points contained
		if (level_properties[level_title].collisions.length >= 2) {
			for (var i = 0; i < level_properties[level_title].collisions.length; i += 2) {
				if (isDefined(level_properties[level_title].collisions[i + 1])) {
					var sizes = createVector(level_properties[level_title].collisions[i + 1].x - level_properties[level_title].collisions[i].x, level_properties[level_title].collisions[i + 1].y - level_properties[level_title].collisions[i].y);
					var loc = createVector(level_properties[level_title].collisions[i].x, level_properties[level_title].collisions[i].y);
					this.collisions.addCollision(new Collision('box', collision_types.floor, loc, sizes, this.collisions));
				}
			}
		}

		// add items
		for (var j = 0; j < level_properties[level_title].items.length; j++) {
			var temp_item = level_properties[level_title].items[j];
			this.items.push(new Item(temp_item.type, createVector(temp_item.x + temp_item.type.offset.x, temp_item.y + temp_item.type.offset.y), this.collisions));
		}

		// add paths
		for (var j = 0; j < level_properties[level_title].paths.length; j++) {
			var temp_path = level_properties[level_title].paths[j];
			this.items.push(new Item(temp_path.type, createVector(temp_path.x + temp_path.type.offset.x, temp_path.y + temp_path.type.offset.y), this.collisions, temp_path.properties));
		}
	}

	display() {
		background(color(191, 248, 255));
		image(this.background_image, 0, 0);
		noStroke();

		for (var i = 0; i < this.items.length; i++) {
			this.items[i].display();
		}

		this.collisions.display();

		this.player_cat.update();
		this.player_cat.display();
	}
}
