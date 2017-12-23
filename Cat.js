class Cat {
	constructor(loc, typeID, i) {
		// The display location of the cat
		this.location = vectorToDisplay(loc);

		this.cellLocation = loc;

		// The cat Type ID: only toby so far // Todo: add cats
		this.type = typeID;

		// Unique index id
		this.index = i;

		// Direction the cat is facing State: 1:left, 0: right
		this.dir = 0;

		//Default floor value y height
		this.default_floor = height - (109 / 2) - 22;

		// The height of the floor
		this.floor = this.default_floor;

		// The mass of the cat, have type lookup
		this.mass = 10;

		// Default Velocity: current velocity, collective from multiple updates
		this.velocity = createVector(0, 0);

		// Default Acceleration: current vectors applied
		this.acceleration = new createVector(0, 0);

		this.collision_box = new Collision('box', this.location, createVector(t2.width / 2, t2.height / 2));

		this.state = states.idle;

		this.is_colliding = false;

		this.inventory = {};
	}

	setState(state) {
		this.state = state;
	}

	getState() {
		return this.state;
	}

	// Apply vector force to cat physics
	applyForce(force) {
		// Scale To mass
		var f = p5.Vector.div(force, this.mass);

		// Apply to this frames accel
		this.acceleration.add(f);
	}

	// Return Boolean if within screen
	inBounds() {
		return (this.location.x < width + this.mass && this.location.x > -this.mass && this.location.y < height + this.mass && this.location.y > -this.mass);
	}

	handleInput() {
		if (keyIsPressed === true) {
			if (keyCode === LEFT_ARROW) {
				this.moveLeft();
				if (this.getState() === states.jumping || this.getState() === states.movejump) {
					this.setState(states.movejump);
				} else {
					this.setState(states.moving);
				}
			} else if (keyCode === RIGHT_ARROW) {
				this.moveRight();
				if (this.getState() === states.jumping || this.getState() === states.movejump) {
					this.setState(states.movejump);
				} else {
					this.setState(states.moving);
				}
			} else if ((keyCode === UP_ARROW) && (this.getState() !== states.jumping && this.getState() !== states.movejump)) {
				keyCode = undefined;
				this.setState(states.jumping);

				this.moveUp();
			}
		} else if (this.getState() !== states.jumping && this.getState() !== states.movejump) {
			this.setState(states.idle);
		}

	}

	checkCollisions(callback) {
		// If hit collision box
		for (var i = 0; i < collision_manager.getCollisions().length; i++) {
			if (typeof collision_manager.getCollision(i) !== 'undefined') {
				if (collision_manager.getCollision(i).intersects(this.collision_box) !== false) {
					this.is_colliding = true;
					callback(collision_manager.getCollision(i));
				}
			}
		}
		this.is_colliding = false;
		callback(false);
	}

	collectItem(item) {
		if (this.inventory.hasOwnProperty(item.type)) {
			this.inventory[item.type] += 1;
		} else {
			this.inventory[item.type] = 1;
		}

		item.parent.collected = true;
		collision_manager.removeCollision(item.id);
	}

	// Update every frame
	update() {
		this.cellLocation = displayToVector(this.location);
		this.handleInput();

		if (this.state !== states.idle) {
			this.applyForce(createVector(0, 1.4)); // gravity
		}

		if (this.is_colliding === false) {
			var that = this;
			this.checkCollisions(function (collider) {
				if (collider) {
					if (collider.type === item_types.rollingrock.string_id) {
						that.collectItem(collider);
					} else {
						that.velocity.mult(0);
						that.acceleration.mult(0);
						that.location.y -= 1;
						if (that.getState() === states.movejump) {
							that.setState(states.moving);
						} else if (that.getState() !== states.moving) {
							that.setState(states.idle);
						}
					}
					//this.applyForce(createVector(0, -10));
				}
			});
		} else {
			var that = this;
			this.checkCollisions(function (collider) {
				if (collider) {
					if (collider.type === item_types.rollingrock.string_id) {
						that.collectItem(collider);
					} else if (!keyIsPressed) {
						that.velocity.x *= 0.5;
					}
				}
			});
		}


		// Update physics
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
	}

	distance(m) {
		// distance to another location object
		return dist(m.location.x, m.location.y, this.location.x, this.location.y);
	}

	// Move Left Action, left arrow
	moveLeft() {
		this.applyForce(createVector(-2, 0));
		this.dir = 1;
	}

	// Move Right Action, right arrow
	moveRight() {
		this.applyForce(createVector(2, 0));
		this.dir = 0;
	}

	// Jump action, up arrow TODO: Add Space button, wasd
	moveUp() {
		//this.location.y -= 5;
		this.applyForce(createVector(0, -30));
	}

	// display the cat
	display() {
		// Display cat image, use ternary to decide what image based on direction
		// TODO: use a function to determine image, enable animation
		image(this.dir == 1 ? t2 : t3, this.location.x, this.location.y, 140 / 2, 109 / 2);
		fill(0, 0, 255);
		text('Inventory: ' + this.inventory['rollingrock'], 5, 10);
		if (DEBUG === 'col') {
			fill(color(255, 0, 0));
			if (this.is_colliding) {
				ellipse(25, 25, 15, 15);
			}

			text(Object.keys(states)[this.state], 16, 50);
			text(Math.round(this.velocity.x) + ', ' + round(this.velocity.y), 16, 60);
			text(this.cellLocation.x + ', ' + this.cellLocation.y, 16, 70);
			this.collision_box.display();
		}
	}
}
