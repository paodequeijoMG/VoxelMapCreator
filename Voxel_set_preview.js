let voxel_slider = [];
let index = 0;
let index_left;
let index_right;
let count;


let sketch4 = function (p) {

  let w;
  let h;

  p.setup = function() {
    //create canvas in html with width and height of parent sizes
    const parentDiv = p.canvas.parentElement;
    w = parentDiv.clientWidth;
    h = parentDiv.clientHeight;
    p.createCanvas(w, h);  
  };

  p.draw = function() {
    p.background(255);
    create_voxel_array();
    if (voxel_selected_2D.length > 0) {
      for (let i = 0; i < voxel_slider.length; i++) {
        voxel_slider[i].show();
      }
    }
  };

  shift_left = function() {
    if (count > 0) {
      for (let i = 0; i < voxel_slider.length; i++){
        voxel_slider[i].x0 = voxel_slider[i].x0 + (w * 0.46);
      }
      count--;
    }
  };

  shift_right = function() {
    if (count < voxel_slider.length - 1) {
      for (let i = 0; i < voxel_slider.length; i++){
        voxel_slider[i].x0 = voxel_slider[i].x0 - (w * 0.46);
      }
      count++;
    }
  };

  create_voxel_array = function () {
    let v_side = w / 8;
    if (is_mouse_hover_C2 == true) {
      voxel_slider = [];
      for (let i = 0; i < voxel_set.length; i++) {
        voxel_slider[i] = new Voxel_representation((w/2) - (i * w * 0.46), v_side);
        voxel_slider[i].c1_base = voxel_set[i].c1_base;
        voxel_slider[i].c2_base = voxel_set[i].c2_base;
        count = voxel_slider.length - 1;
      }
    }
  };

};
var myp5_4 = new p5(sketch4, 'canvas_voxel_representation');



class Voxel_representation {
  constructor(_x0, _v_side) {
      this.x0 = _x0;
      this.y0 = _v_side;
      this.c1_base = '#999999';
      this.c2_base = '#999999';
      this.p1;
      this.p2;
      this.p3;
      this.p4;
      this.p5;
      this.p6;
      this.p7;
  }

  show() {
    this.p1 = [this.x0, this.y0 ];
    this.p2 = [this.x0 - this.y0, this.y0 + this.y0];
    this.p3 = [this.x0 + this.y0, this.y0 + this.y0];
    this.p4 = [this.x0, this.y0 + (2 * this.y0)];
    this.p5 = [this.x0 - this.y0, this.y0 + this.y0 + (3 * this.y0)];
    this.p6 = [this.x0, this.y0 + (2 * this.y0) + (3 * this.y0)];
    this.p7 = [this.x0 + this.y0, this.y0 + this.y0 + (3 * this.y0)];
    myp5_4.stroke('black');
    myp5_4.strokeWeight(2);
    myp5_4.fill(this.c1_base);
    myp5_4.quad(this.p1[0], this.p1[1], this.p3[0], this.p3[1], this.p4[0], this.p4[1], this.p2[0], this.p2[1]);
    myp5_4.fill(this.c2_base);
    myp5_4.quad(this.p2[0], this.p2[1], this.p4[0], this.p4[1], this.p6[0], this.p6[1], this.p5[0], this.p5[1]);
    myp5_4.fill(this.c2_base);
    myp5_4.quad(this.p4[0], this.p4[1], this.p3[0], this.p3[1], this.p7[0], this.p7[1], this.p6[0], this.p6[1]);
  }
}