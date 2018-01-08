class Game {
	constructor() {
		this.DEBUG_STATE = debug_states.off;
		this.menu = new Menu();
		this.inventory_manager = new InventoryManager();

		// Map Options
		this.level_manager = new LevelManager(this);

		// If Debug set up level editor
		if (this.DEBUG_STATE === debug_states.level_editor) {
			this.level_editor = new LevelEditor();
		}
		this.level_manager.setLevel(level_properties.FortSampsonInside_LivingRoom);
	}

	display() {
		if (this.menu.menu_state !== menu_states.game) {
			this.menu.display();
		} else {
			this.level_manager.display();
			if (this.DEBUG_STATE === debug_states.level_editor) {
				this.level_editor.display();
			}
		}
		this.inventory_manager.display();
	}

	handleClicks() {
		if (this.DEBUG_STATE === debug_states.level_editor) {
			this.level_editor.handleClick();
		}
	}
}
