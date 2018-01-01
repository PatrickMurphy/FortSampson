class Menu {
	constructor(state) {
		this.elements = {};
		this.menu_state = state || menu_states.main_menu;
		this.addMainMenu();
	}

	addElement(state, element) {
		if (this.elements.hasOwnProperty(state)) {
			this.elements[state].push(element);
		} else {
			this.elements[state] = [];
			this.elements[state].push(element);
		}
	}

	addMainMenu() {
		var init_pos = createVector(width / 6, height / 1.4);
		var standard_size = createVector(width * .66, height * .1);
		var half_size = createVector(width * .32, standard_size.y);
		// choose a cat
		// start game
		this.addElement(menu_states.main_menu, new GUIButton("Start Game", init_pos, standard_size));
		// settings
		this.addElement(menu_states.main_menu, new GUIButton("Settings", init_pos.copy().add(createVector(0, height * .12)), half_size));
		// about
		this.addElement(menu_states.main_menu, new GUIButton("About", init_pos.copy().add(createVector(width * .34, height * .12)), half_size));
	}

	display() {
		background(color(150, 150, 150));
		for (var i = 0; i < this.elements[this.menu_state].length; i++) {
			this.elements[this.menu_state][i].display();
		}
	}

	handleClicks() {

	}
}
