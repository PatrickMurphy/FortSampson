class Tile {
  constructor(loc, typeID,i) {
    this.location = loc;
    this.type = typeID;
    this.index = i;
  }

  update() {
  }

  display() {
    if (this.type == '0') {
      noFill();
    } else if(this.type == 1 || this.type == 2) {
        if(this.type == 2){
            image(t4,cell_size*(this.location.x)+30, this.location.y*cell_size)
        }
      fill(map(this.location.x, 0, cell_x_count, 0, 127.5)+map(this.location.y, 0, cell_y_count, 0, 127.5));
      image(t1, cell_size*(this.location.x), this.location.y*cell_size);
    }
    //rect(cell_size*(this.location.x), this.location.y*cell_size, cell_size, cell_size);
    fill(color(255, 0, 0));
    //text(vectorToIndex(this.location.x, this.location.y)+","+this.index, (cell_size*(this.location.x))+cell_size/2, (this.location.y*cell_size)+cell_size/2);
  }
}
