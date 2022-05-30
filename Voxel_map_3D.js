const voxel_side = 50;
const nx_voxel = 8;
const ny_voxel = 8;
let v_index;
let voxel_3D = [nx_voxel * ny_voxel];
const bg_color = '#ffffff';
let canvas1 = document.getElementById('canvas1');
let img_top_load_3D = [];
let img_middle_load_3D = []; 
let img_bottom_load_3D = [];
let height_corners = [];
let gif_load_3D = [];
const dark_intensity = 100;
const base_color = '#999999';

let sketch1 = function (p) {

    p.preload = function () {
        //load top
        for (let i = 0; i < 6; i++) {
            k = i + 1;
            img_top_load_3D[i] = myp5_1.loadImage(`../Assets/Top/TopTexture${k}.png`);
        }
        //load middle
        for (let i = 0; i < 7; i++) {
            k = i + 1;
            img_middle_load_3D[i] = myp5_1.loadImage(`../Assets/Middle/MiddleTexture${k}.png`);
        }
        //load bottom
        for (let i = 0; i < 6; i++) {
            k = i + 1;
            img_bottom_load_3D[i] = myp5_1.loadImage(`../Assets/Bottom/BottomTexture${k}.png`);
        }
        //gif image
        for (let i = 0; i < 1; i++) {
            k = i + 1;
            gif_load_3D[i] = myp5_1.loadImage(`../Assets/GIFs/gif${k}.gif`);
        }
    }

    p.setup = function () {
        //creat canvas in html with width and height of parent sizes
        var canvas = p.createCanvas(canvas1.clientWidth, canvas1.clientHeight, p.WEBGL);
        canvas.parent('canvas1');
        canvas.id('canvas3D');
        
        //instace the 3D voxels objects
        for (let j = 0; j < ny_voxel; j++) {
            for (let i = 0; i < nx_voxel; i++) {
                v_index = i + nx_voxel * j;
                voxel_3D[v_index] = new Voxel_3D(voxel_side, i, j, i + (j * nx_voxel));
            }
        }

        //creation height matrix
        for (let i = 0; i < voxel_3D.length; i++) {
            var circle_scan = {
                top: true,
                right: true,
                bottom: true, 
                left: true,
                x: voxel_3D[i].index_x,
                y: voxel_3D[i].index_y,
            }
            height_corners[i] = circle_scan;
            
            //edge scan 
            if (voxel_3D[i].index_y == 0) {
                height_corners[i].top = false;
            } 
            if (voxel_3D[i].index_x + 1 == nx_voxel) {
                height_corners[i].right = false;
            } 
            if (voxel_3D[i].index_y + 1 == ny_voxel) {
                height_corners[i].bottom = false;
            } 
            if (voxel_3D[i].index_x == 0) {
                height_corners[i].left = false;
            } 
        }
    }

    p.windowResized = function () {
        p.resizeCanvas(canvas1.clientWidth, canvas1.clientHeight, p.WEBGL);
    }

    p.draw = function () {
        //draw backgroung and set camera control
        p.background(bg_color);
        p.orbitControl();
        p.ortho();
        // show Voxel Map
        p.rotateX(p.PI / 4);
        p.rotateZ(p.PI / 4);
        p.translate(-nx_voxel * voxel_side / 2, -ny_voxel * voxel_side / 2);
        // creat array of voxels
        for (let i = 0; i < voxel_3D.length; i++) {
            voxel_3D[i].show();
        }
    };
};
var myp5_1 = new p5(sketch1, 'canvas1');


// 3D Voxel Object
class Voxel_3D {
    constructor(_voxel_side, _i, _j, _n) {
        this.side = _voxel_side;
        this.h = _voxel_side;
        this.index_x = _i;
        this.index_y = _j;
        this.n = _n;
        this.v_selected = false;
        this.color_top = base_color;
        this.color_bottom = base_color;
        this.factor_h = 1;
        this.top;
        this.right;
        this.bottom;
        this.left;
        this.show_mode = 1;
        this.img_selection_top;
        this.img_selection_middle;
        this.img_selection_bottom;
        this.gif_selection;
        this.detalhe = 1;
    }
    
    show() {
        //top plane
        myp5_1.push();
        this.texturesTop();
        myp5_1.translate(this.side * (this.index_x + 1), this.side * this.index_y, 0);
        myp5_1.translate(0, 0, this.factor_h * voxel_side);
        myp5_1.plane(voxel_side, voxel_side, this.detalhe, this.detalhe);
        myp5_1.pop();

        //side plane front
        if (height_corners[this.n].top == false || this.factor_h > voxel_3D[this.n - nx_voxel].factor_h) {
            if (height_corners[this.n].top == false) {
                this.top = 0;
            } else {
                this.top = voxel_3D[this.n - nx_voxel].factor_h;
            }
            myp5_1.push();
            this.referenceDraw();
            myp5_1.rotateX(myp5_1.PI/2);
            myp5_1.translate(voxel_side/2, 0, voxel_side/2);
            this.side_mode = 1;
            this.underTop();
        } 

        //side plane right
        if (height_corners[this.n].right == false || this.factor_h > voxel_3D[this.n + 1].factor_h) {
            if (height_corners[this.n].right == false) {
                this.right = 0;
            } else {
                this.right = voxel_3D[this.n + 1].factor_h;
            }
            myp5_1.push();
            this.referenceDraw();
            myp5_1.translate(voxel_side/2, 0, voxel_side/2);
            this.side_mode = 2;
            this.underTop();
        }

         //side plane back
        if (height_corners[this.n].bottom == false || this.factor_h > voxel_3D[this.n + nx_voxel].factor_h) {
            if (height_corners[this.n].bottom == false) {
                this.bottom = 0;
            } else {
                this.bottom = voxel_3D[this.n + nx_voxel].factor_h;
            }
            myp5_1.push();
            this.referenceDraw();
            myp5_1.rotateX(myp5_1.PI/2);
            myp5_1.translate(voxel_side/2, 0, -voxel_side/2);
            this.side_mode = 3;
            this.underTop();
        }

        //side plane left
        if (height_corners[this.n].left == false || this.factor_h > voxel_3D[this.n - 1].factor_h) {
            if (height_corners[this.n].left == false) {
                this.left = 0;
            } else {
                this.left = voxel_3D[this.n - 1].factor_h;
            }
            myp5_1.push();
            this.referenceDraw();
            myp5_1.translate(voxel_side/2, 0, -voxel_side/2);
            this.side_mode = 4;
            this.underTop();
        }
    }

    texturesTop() {
        switch(this.show_mode) {
            case 1:
                if (no_selection > 0 && this.v_selected == false) {
                    myp5_1.fill(this.shadecolor(this.color_top, -0.4));
                } else {
                    myp5_1.fill(this.color_top);
                }
                this.detalhe = 1;
            break;

            case 2:
                if (no_selection > 0 && this.v_selected == false) {
                    myp5_1.tint(dark_intensity, 255);
                }
                myp5_1.texture(img_top_load_3D[this.img_selection_top]);
                this.detalhe = 2;
            break;

            case 3:
                if (no_selection > 0 && this.v_selected == false) {
                    myp5_1.tint(dark_intensity, 255);
                }
                myp5_1.texture(gif_load_3D[this.gif_selection]);
                this.detalhe = 2;
            break;

            default:
                myp5_1.fill(this.color_top);
        }
    }

    texturesMiddle() {
        switch(this.show_mode) {
            case 1:
                if (no_selection > 0 && this.v_selected == false) {
                    myp5_1.fill(this.shadecolor(this.color_bottom, -0.4));
                } else {
                    myp5_1.fill(this.color_bottom);
                }
                this.detalhe = 1;
            break;

            case 2:
                if (no_selection > 0 && this.v_selected == false) {
                    myp5_1.tint(dark_intensity, 255);
                }
                myp5_1.texture(img_middle_load_3D[this.img_selection_middle]);
                this.detalhe = 2;
            break;

            case 3:
                if (no_selection > 0 && this.v_selected == false) {
                    myp5_1.fill(this.shadecolor(this.color_bottom, -0.4));
                } else {
                    myp5_1.fill(this.color_bottom);
                }
                this.detalhe = 1;
            break;

            default:
                myp5_1.fill(this.color_bottom);
        }
    }

    texturesBottom() {
        switch(this.show_mode) {
            case 1:
                if (no_selection > 0 && this.v_selected == false) {
                    myp5_1.fill(this.shadecolor(this.color_bottom, -0.4));
                } else {
                    myp5_1.fill(this.color_bottom);
                }
                this.detalhe = 1;
            break;

            case 2:
                if (no_selection > 0 && this.v_selected == false) {
                    myp5_1.tint(dark_intensity, 255);
                }
                myp5_1.texture(img_bottom_load_3D[this.img_selection_bottom]);
                this.detalhe = 2;
            break;

            case 3:
                if (no_selection > 0 && this.v_selected == false) {
                    myp5_1.fill(this.shadecolor(this.color_bottom, -0.4));
                } else {
                    myp5_1.fill(this.color_bottom);
                }
                this.detalhe = 1;
            break;

            default:
                myp5_1.fill(this.color_bottom);
        }
    }

    referenceDraw() {
        myp5_1.translate(this.side * (this.index_x + 1), this.side * this.index_y, 0);
        myp5_1.rotateY(myp5_1.PI/2);
    }

    underTop() {
        myp5_1.translate(-this.factor_h * voxel_side, 0, 0);
        this.texturesMiddle();
        myp5_1.plane(voxel_side, voxel_side, this.detalhe, this.detalhe);
        this.texturesBottom();
        switch (this.side_mode) {
            case 1:
                this.p = this.top;
                break;
            case 2:
                this.p = this.right;
                break;
            case 3:
                this.p = this.bottom;
                break;
            case 4:
                this.p = this.left;
                break;
        }
        if (this.factor_h > 0) {
            for (let i = 1; i < this.factor_h - this.p; i++) {
                myp5_1.translate(voxel_side, 0, 0);
                myp5_1.plane(voxel_side, voxel_side, this.detalhe, this.detalhe);
            }
        }
        myp5_1.pop();
    }

    shadecolor(color, percent) {
        var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
        return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    }
}