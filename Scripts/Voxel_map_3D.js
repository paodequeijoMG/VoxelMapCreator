const voxel_side = 20;
const nx_voxel = 8;
const ny_voxel = 8;
let v_index;
let voxel_3D = [nx_voxel * ny_voxel];
const bg_color = 240;


let sketch1 = function (p) {

    p.setup = function () {
        //creat canvas in html with width and height of parent sizes
        const parentDiv = p.canvas.parentElement;
        p.createCanvas(parentDiv.clientWidth, parentDiv.clientHeight, p.WEBGL);

        //instace the 3D voxels objects
        for (let j = 0; j < ny_voxel; j++) {
            for (let i = 0; i < nx_voxel; i++) {
                v_index = i + nx_voxel * j;
                voxel_3D[v_index] = new Voxel_3D(voxel_side, i, j);
            }
        }
    }

    p.draw = function () {
        //draw backgroung and set camera control
        p.background(bg_color);
        p.orbitControl();

        //show Voxel Map
        p.rotateX(p.PI / 4);
        p.rotateZ(p.PI / 4);
        p.translate(-nx_voxel * voxel_side / 2, -ny_voxel * voxel_side / 2);
        for (let i = 0; i < voxel_3D.length; i++) {
            voxel_3D[i].show();
        }
    };
};
var myp5_1 = new p5(sketch1, 'canvas1');


// 3D Voxel Object
class Voxel_3D {
    constructor(_voxel_side, _i, _j) {
        this.side = _voxel_side;
        this.h = _voxel_side;
        this.index_x = _i;
        this.index_y = _j;
        this.v_selected = false;
        this.c1_base = '#999999';
        this.color_top;
        this.c2_base = '#999999';
        this.color_botton;
        this.factor_h = 0;
        this.p;
        this.no_selected;
    }

    show() {
        this.p = [[0, 0, this.side * this.factor_h], [this.side, 0, this.side * this.factor_h], [this.side, this.side, this.side * this.factor_h], [0, this.side, this.side * this.factor_h], [0, 0, -this.side], [this.side, 0, -this.side], [this.side, this.side, -this.side], [0, this.side, -this.side]];
        if (no_selection == 0 || no_selection == null) {
            this.color_top = this.c1_base;
            this.color_botton = this.c2_base;
        } else {
            if (this.v_selected == true) {
                this.color_top = this.c1_base;
                this.color_botton = this.c2_base;
            } else {
                this.color_top = this.shadecolor(this.c1_base, -0.4);
                this.color_botton = this.shadecolor(this.c2_base, -0.4);
            }
        }
        myp5_1.translate(this.side * (this.index_x + 1), this.side * this.index_y, 0);
        //top plane
        myp5_1.fill(this.color_top);
        myp5_1.beginShape();
        for (let i = 0; i < 4; i++) {
            myp5_1.vertex(this.p[i][0], this.p[i][1], this.p[i][2]);
        }
        myp5_1.endShape(myp5_1.CLOSE);
        //side plane 1
        myp5_1.fill(this.color_botton);
        myp5_1.beginShape();
        myp5_1.vertex(this.p[0][0], this.p[0][1], this.p[0][2]);
        myp5_1.vertex(this.p[1][0], this.p[1][1], this.p[1][2]);
        myp5_1.vertex(this.p[5][0], this.p[5][1], this.p[5][2]);
        myp5_1.vertex(this.p[4][0], this.p[4][1], this.p[4][2]);
        myp5_1.endShape(myp5_1.CLOSE);
        // side plane 2
        myp5_1.beginShape();
        myp5_1.vertex(this.p[2][0], this.p[2][1], this.p[2][2]);
        myp5_1.vertex(this.p[1][0], this.p[1][1], this.p[1][2]);
        myp5_1.vertex(this.p[5][0], this.p[5][1], this.p[5][2]);
        myp5_1.vertex(this.p[6][0], this.p[6][1], this.p[6][2]);
        myp5_1.endShape(myp5_1.CLOSE);
        // side plane 3
        myp5_1.beginShape();
        myp5_1.vertex(this.p[3][0], this.p[3][1], this.p[3][2]);
        myp5_1.vertex(this.p[2][0], this.p[2][1], this.p[2][2]);
        myp5_1.vertex(this.p[6][0], this.p[6][1], this.p[6][2]);
        myp5_1.vertex(this.p[7][0], this.p[7][1], this.p[7][2]);
        myp5_1.endShape(myp5_1.CLOSE);
        // side plane 4
        myp5_1.beginShape();
        myp5_1.vertex(this.p[0][0], this.p[0][1], this.p[0][2]);
        myp5_1.vertex(this.p[4][0], this.p[4][1], this.p[4][2]);
        myp5_1.vertex(this.p[7][0], this.p[7][1], this.p[7][2]);
        myp5_1.vertex(this.p[3][0], this.p[3][1], this.p[3][2]);
        myp5_1.endShape(myp5_1.CLOSE);
        myp5_1.translate(-(this.side * (this.index_x + 1)), -(this.side * this.index_y), 0);
    }

shadecolor(color, percent) {
    var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

}