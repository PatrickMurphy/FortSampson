class Cat {

    constructor(loc, typeID, i) {
        //super(createVector(cell_size * (loc.x), (loc.y * cell_size)), 4);
        this.location = loc;
        this.location = createVector(cell_size * (this.location.x), (this.location.y * cell_size));
        this.type = typeID;
        this.index = i;
        this.dir = 0;
        this.default_floor = height - (109 / 2) - 22;
        this.floor = this.default_floor;
        this.mass = 4;
        this.velocity = createVector(0, 0);
        this.acceleration = new createVector(0, 0);
    }

   // update() {
     //   if (this.location.y < this.floor) {
       //     this.location.y += .5;
        //}
        //if(level[vectorToIndex(this.location.x, this.location.y)].type !== 0){
        //    console.log(level[vectorToIndex(this.location.x,this.location.y)].location.y);
        //    this.floor = level[vectorToIndex(this.location.x,this.location.y)].location.y + cell_size - (109 / 2) - 22;
        //}
//    }

    applyForce(force) {
        var f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    inBounds() {
        return (this.location.x < width + this.mass && this.location.x > -this.mass && this.location.y < height + this.mass && this.location.y > -this.mass);
    }

    update() {
        if(this.location.y < this.floor){
            this.applyForce(createVector(0,1));
        }else{
            //this.velocity.mult(.2);
            //this.acceleration.mult();
            this.location.y = this.floor-1;
        }

        if(this.dir == 1 && this.location.y >= this.floor){
            this.applyForce(createVector(.1,0));
        }
        if(this.dir == 0 && this.location.y >= this.floor){
            this.applyForce(createVector(-.1,0));
        }


        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }

    distance(m) {
        return dist(m.location.x, m.location.y, this.location.x, this.location.y);
    }


    moveLeft() {
        this.applyForce(createVector(-3,0));
        this.dir = 1;
    }
    moveRight() {
        this.applyForce(createVector(3,0));
        this.dir = 0;
    }

    moveUp() {
        this.applyForce(createVector(0,-25));
    }

    display() {
        //fill(map(this.location.x, 0, cell_x_count, 0, 127.5)+map(this.location.y, 0, cell_y_count, 0, 127.5));
        image(this.dir == 1 ? t2 : t3, this.location.x, this.location.y, 140 / 2, 109 / 2);
    }
}
