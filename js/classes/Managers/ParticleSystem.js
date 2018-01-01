class ParticleSystem {
	constructor(location) {
		this.location = location;
		this.particles = [];
		this.particle_count = 30;
	}

	addParticle() {
		if (this.particles.length < this.particle_count) {
			this.particles.push(new Particle(this));
		}
	}

	update() {
		if (random(0, 1000) > 970) {
			this.addParticle();
		}
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].update();
		}
	}
	display() {
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].display();
		}
	}
	getSource() {
		return this.location.copy();
	}
}
