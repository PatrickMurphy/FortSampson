class LevelEditor {
	constructor() {
		this.tool = 'collisions';
		this.points = {
			items: [],
			paths: [],
			collisions: []
		};
	}

	printPoints() {
		var string_out = '';
		for (var i = 0; i < this.points.collisions.length; i++) {
			string_out += '{x:' + Math.round(this.points.collisions[i].x) + ',y:' + Math.round(this.points.collisions[i].y) + '},';
		}
		console.log(string_out);
	}

	handleClick() {
		var tools = ['collisions', 'paths', 'items'];
		console.log(mouseX, mouseY);
		if (mouseButton === RIGHT) {
			this.tool = tools[(tools.indexOf(this.tool) + 1) % tools.length];
		}
		if (this.tool === 'collisions') {
			this.points.collisions.push(createVector(mouseX, mouseY));
		}
	}

	// Draw temporary shapes to show where items cliping would be TODO: show items and paths, start point
	// 		GUI to show current tool options, p5dom to show exports and other options, delete current or new, modify existing and new
	//		Allow others to create levels?
	display() {
		text(this.tool + ' Right Click to change', 5, 100); // display current tool
		if (this.points.collisions.length >= 2) {
			for (var i = 0; i < this.points.collisions.length; i += 2) {
				if (isDefined(this.points.collisions[i + 1])) {
					rect(this.points.collisions[i].x, this.points.collisions[i].y, this.points.collisions[i + 1].x - this.points.collisions[i].x, this.points.collisions[i + 1].y - this.points.collisions[i].y)
				}
			}
		}
	}
}
