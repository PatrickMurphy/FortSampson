var item_names, tile_names, tile_types, states, collision_directions, collision_types, level_types;


function setupEnums() {
	item_types = {
		rollingrock: {
			id: 0,
			string_id: 'rollingrock',
			title: 'Rolling Rock',
			image: t4,
			offset: createVector(30, 0)
		},
		path: {
			id: 1,
			string_id: 'path',
			title: 'path',
			image: t4,
			offset: createVector(15, 0)
		}
	};

	states = {
		idle: 0,
		moving: 1,
		jumping: 2,
		movejump: 3,
		dead: 4
	};

	item_names = ['rollingrock'];


	tile_types = {
		air: {
			id: 0,
			collisions: false,
			objects: true
		},
		grass: {
			id: 1,
			collisions: true,
			objects: true
		}
	};
	tile_names = ['air', 'grass'];

	collision_directions = {
		none: 0,
		top: 1,
		bottom: 2,
		top_bottom: 3, // top plus bottom
		sides: 4,
		sides_top: 5, // sides + top
		sides_bottom: 6,
		all: 7 // top+bottom+sides=7
	};
	collision_types = {
		floor: {
			id: 0,
			isHardBody: true,
			direction: collision_directions.top,
			stationary: true
		},
		item: {
			id: 1,
			isHardBody: false,
			direction: collision_directions.all,
			stationary: true
		},
		path: {
			id: 2,
			isHardBody: false,
			direction: collision_directions.all,
			stationary: true
		},
		cat: {
			id: 3,
			isHardBody: true,
			direction: collision_directions.all,
			stationary: false
		}
	}

	level_types = {
		cells: 0,
		svg: 1
	};

	level_properties = {
		FortSampsonOutside: {
			hasBG: true,
			collisions: [{
					x: 40,
					y: 589
			},
				{
					x: 421,
					y: 599
			},
				{
					x: 123,
					y: 535
			},
				{
					x: 232,
					y: 540
			},
				{
					x: 502,
					y: 346
			},
				{
					x: 702,
					y: 350
			},
				{
					x: 568,
					y: 312
			},
				{
					x: 622,
					y: 318
			},
				{
					x: 52,
					y: 359
			},
				{
					x: 422,
					y: 362
			},
				{
					x: 53,
					y: 279
			},
				{
					x: 421,
					y: 281
			},
				{
					x: 37,
					y: 228
			},
				{
					x: 258,
					y: 232
			},
				{
					x: 36,
					y: 78
			},
				{
					x: 520,
					y: 82
			},
				{
					x: 125,
					y: 422
			},
				{
					x: 229,
					y: 425
			}]
		}
	}
}
