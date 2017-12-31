class Cat {
	constructor(loc, typeID, i, collision_man) {
		// The display location of the cat
		this.location = vectorToDisplay(loc);

		this.cellLocation = loc;

		this.collision_man = collision_man;

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

		this.collision_box = new Collision('box', collision_types.cat, this.location, createVector(t2.width / 2, t2.height / 2));

		this.state = states.idle;

		this.is_colliding = false;

		this.inventory = {};
	}

	setState(state) {
		this.state = state;
		if (this.state === states.idle) {
			this.is_colliding = true;
		}
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
		keyCode = undefined;
	}

	checkCollisions(callback) {
		// If hit collision box
		var ccd = this.collision_box.copy('temp_ccd');
		var temp_vel = this.velocity.copy();
		temp_vel.add(this.acceleration.copy());
		ccd.location.add(temp_vel);
		for (var i = 0; i < this.collision_man.getCollisions().length; i++) {
			if (isDefined(this.collision_man.getCollision(i))) {
				if (this.collision_man.getCollision(i).intersects(ccd) !== false) {
					this.is_colliding = true;
					callback(this.collision_man.getCollision(i));
				}
			}
		}
		//this.setState(states.jumping);
		this.is_colliding = false;
		callback(false);
	}

	collectItem(item) {
		if (item.type === 'path') {
			if (item.parent.properties.hasOwnProperty('destination')) {
				level_manager.setLevel(level_properties[item.parent.properties.destination]);
			}
		} else {
			if (this.inventory.hasOwnProperty(item.type)) {
				this.inventory[item.type] += 1;
			} else {
				this.inventory[item.type] = 1;
			}

			item.parent.collected = true;
			this.collision_man.removeCollision(item.id);
		}
	}

	// Update every frame
	update() {
		this.cellLocation = displayToVector(this.location);
		this.handleInput();

		if (this.state !== states.idle) {
			this.applyForce(createVector(0, 1.4)); // gravity
		}


		//this.applyForce(createVector(0, 1.4)); // gravity

		if (this.is_colliding === false && this.velocity.y > 0) {
			var that = this;
			this.checkCollisions(function (collider) {
				if (collider) {
					//console.log(collider.type);
					if (collider.type === item_types.rollingrock.string_id || collider.type === item_types.path.string_id) {
						that.collectItem(collider);
					} else {
						that.velocity.y = 0;
						that.acceleration.mult(0);
						//that.location.y -= 1;
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
					if (collider.type === item_types.rollingrock.string_id || collider.type === item_types.path.string_id) {
						that.collectItem(collider);
					} else if (!keyIsPressed) {
						//that.velocity.limit(2);
						that.velocity.x *= 0.35;
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
		//this.location.y -= 5;
		this.applyForce(createVector(0, -45));
	}

	// display the cat
	display() {
		// Display cat image, use ternary to decide what image based on direction
		// TODO: use a function to determine image, enable animation
		image(this.dir == 1 ? t2 : t3, this.location.x, this.location.y, 140 / 2, 109 / 2);
		fill(0, 0, 255);
		text('Inventory: ' + this.inventory['rollingrock'], 5, 10);
		if (DEBUG !== false) {
			ellipse(this.location.x, this.location.y, 3, 3);
		}
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
