class Cat extends Entity {
	constructor(loc, parent) {
		super(loc);

		this.parent = parent;

		this.inventory = {};

		/*--------------
		Physics properties
		----------------*/
		this.dir = 0; // Direction the cat is facing State: 1:left, 0: right TODO: use vector to decide

		this.collision_box = new Collision('box', collision_types.cat, this.location, createVector(t2.width / 2, t2.height / 2), this.parent.collisions);

		this.state = mover_states.idle;

		this.is_colliding = false;
	}

	setState(state) {
		this.state = state;
		if (this.state === mover_states.idle) {
			this.is_colliding = true;
		}
	}

	getState() {
		return this.state;
	}

	handleInput() {
		if (keyIsPressed === true) {
			if (keyCode === LEFT_ARROW) {
				this.moveLeft();
				if (this.getState() === mover_states.jumping || this.getState() === mover_states.movejump) {
					this.setState(mover_states.movejump);
				} else {
					this.setState(mover_states.moving);
				}
			} else if (keyCode === RIGHT_ARROW) {
				this.moveRight();
				if (this.getState() === mover_states.jumping || this.getState() === mover_states.movejump) {
					this.setState(mover_states.movejump);
				} else {
					this.setState(mover_states.moving);
				}
			} else if ((keyCode === UP_ARROW) &&
				(this.getState() !== mover_states.jumping &&
					this.getState() !== mover_states.movejump)) {
				keyCode = undefined;
				this.setState(mover_states.jumping);

				this.moveUp();
			}
		} else if (this.getState() !== mover_states.jumping && this.getState() !== mover_states.movejump) {
			this.setState(mover_states.idle);
		}
		keyCode = undefined;
	}

	checkCollisions(callback) {
		// If hit collision box
		var ccd = this.collision_box.copy('temp_ccd');
		var temp_vel = this.velocity.copy();
		temp_vel.add(this.acceleration.copy());
		ccd.location.add(temp_vel);
		for (var i = 0; i < this.parent.collisions.getCollisions().length; i++) {
			if (isDefined(this.parent.collisions.getCollision(i))) {
				if (this.parent.collisions.getCollision(i).intersects(ccd) !== false) {
					this.is_colliding = true;
					callback(this.parent.collisions.getCollision(i));
				}
			}
		}
		//this.setState(mover_states.jumping);
		this.is_colliding = false;
		callback(false);
	}

	collectItem(item) {
		if (item.type === 'path') {
			if (item.properties.hasOwnProperty('destination')) {
				this.parent.parent.setLevel(level_properties[item.properties.destination], this);
			}
		} else {
			//if (this.inventory.hasOwnProperty(item.type)) {
			//this.inventory[item.type] += 1;
			//} else {
			//	this.inventory[item.type] = 1;
			//}

			this.parent.parent.parent.inventory_manager.increment(item.type);

			item.parent.collected = true;
			this.parent.collisions.removeCollision(item.id);
		}
	}

	// Update every frame
	update() {
		this.handleInput();

		if (this.state !== mover_states.idle && !this.is_colliding) {
			this.applyForce(createVector(0, 1.4)); // gravity
		}

		if (this.is_colliding === false && this.velocity.y > 0) {
			var that = this;
			this.checkCollisions(function (collider) {
				if (collider) {
					if (collider.type === item_types.rollingrock.string_id || collider.type === item_types.path.string_id) {
						that.collectItem(collider);
					} else {
						that.velocity.y = 0;
						that.acceleration.mult(0);
						//that.location.y -= 1;
						if (that.getState() === mover_states.movejump) {
							that.setState(mover_states.moving);
						} else if (that.getState() !== mover_states.moving) {
							that.setState(mover_states.idle);
						}
					}
				}
			});
		} else {
			var that = this;
			this.checkCollisions(function (collider) {
				if (collider) {
					if (collider.type === item_types.rollingrock.string_id || collider.type === item_types.path.string_id) {
						that.collectItem(collider);
					} else if (!keyIsPressed) {
						that.velocity.x *= 0.35;
					}
				}
			});
		}

		super.update();
	}

	// Move Left Action, left arrow
	moveLeft() {
		this.applyForce(createVector(-3, 0));
		this.dir = 1;
	}

	// Move Right Action, right arrow
	moveRight() {
		this.applyForce(createVector(3, 0));
		this.dir = 0;
	}

	// Jump action, up arrow TODO: Add Space button, wasd
	moveUp() {
		this.applyForce(createVector(0, -45));
	}

	getImage() {
		return this.dir == 1 ? t2 : t3;
	}

	drawCatGUI() {
		fill(0, 0, 255);
		//text('Inventory: ' + this.inventory['rollingrock'], 5, 10);
	}

	// display the cat
	display() {
		// Display cat image, use ternary to decide what image based on direction
		// TODO: use a function to determine image, enable animation
		image(this.getImage(), this.location.x, this.location.y, 140 / 2, 109 / 2);
		this.drawCatGUI();
		if (this.parent.parent.parent.DEBUG_STATE !== debug_states.off) {
			ellipse(this.location.x, this.location.y, 3, 3);
		}
		if (this.parent.parent.parent.DEBUG_STATE === debug_states.collisions) {
			fill(color(255, 0, 0));
			if (this.is_colliding) {
				ellipse(25, 25, 15, 15);
			}

			text(Object.keys(mover_states)[this.state], 16, 50);
			text(Math.round(this.velocity.x) + ', ' + round(this.velocity.y), 16, 60);
			this.collision_box.display();
		}
	}
}
