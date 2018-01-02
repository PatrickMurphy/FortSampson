class Collision {
	constructor(typeID, type2, loc, sizes, parent, props) {
		this.location = loc;
		this.type = typeID; // Type id, refer to comment above
		this.collision_type = type2;
		this.sizes = sizes; // the unique the height and with of the collider
		this.id = 0;
		this.parent = parent || undefined;
		this.properties = props || {};
		// TODO: the case statment to assign collisions and objects based on type. json object with properties
	}

	copy(type) {
		return new Collision(this.type, this.collision_type, this.location.copy(), this.sizes.copy(), this.parent);
	}

	intersects(collider) {
		var col1, col2; // switch non-stationary to col1.
		var stationary_flags = {
			both: 0,
			other: 1,
			current: 2,
			neither: 3
		};
		var stationary_state = stationary_flags.current;
		if (collider.collision_type.stationary) {
			if (this.collision_type.stationary) {
				// both stationary
				stationary_state = stationary_flags.both;
				col1 = this;
				col2 = collider;
			} else {
				// just other stationary
				stationary_state = stationary_flags.other;
				col1 = collider;
				col2 = this;
			}
		} else if (this.collision_type.stationary) {
			// other is not, this is stationary
			stationary_state = stationary_flags.current;
			col1 = this;
			col2 = collider;
		} else {
			// neither stationary
			stationary_state = stationary_flags.neither;
			col1 = this;
			col2 = collider;
		}

		if (col1.collision_type.direction === collision_directions.top) {
			if (col1.location.y < col2.location.y - col2.sizes.y) {
				// col2 is below col1
				return false;
			}
		} else if (col1.collision_type.direction === collision_directions.bottom) {
			if (col1.location.y + col1.sizes.y > col2.location.y + col2.sizes.y) {
				// col2 is above col1
				return false;
			}
		}

		// default
		return col1.location.x < col2.location.x + col2.sizes.x &&
			col1.location.x + col1.sizes.x > col2.location.x &&
			col1.location.y < col2.location.y + col2.sizes.y &&
			col1.sizes.y + col1.location.y > col2.location.y;
	}

	display() {
		if (this.parent.parent.parent.parent.DEBUG_STATE !== debug_states.off) {
			fill(color(55, 55, 55));
			if (this.collision_type.direction === collision_directions.all) {
				stroke(0);
			} else {
				noStroke();
			}
			rect(this.location.x, this.location.y, this.sizes.x, this.sizes.y);
			if (this.collision_type.direction === collision_directions.top) {
				stroke(0);
				line(this.location.x, this.location.y, this.location.x + this.sizes.x, this.location.y);
				noStroke();
			}
		} else {
			stroke(0, 70);
			line(this.location.x, this.location.y, this.location.x + this.sizes.x, this.location.y);
			noStroke();
		}
	}
}
