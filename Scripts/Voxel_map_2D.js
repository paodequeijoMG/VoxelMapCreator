let voxel_2D = [nx_voxel*ny_voxel];
let voxel_selected_2D = [];
let voxel_selected_3D = [];
let is_mouse_hover_C2 = false;
let RS = [];
let P = [];
let no_selection;
let voxel_set = [];

let sketch2 = function (p) {

    let x;
    let y;
    let selectdx;
    let selectdy;
    let tempX;
    let tempY;

    p.setup = function () {
        //creat canvas in html with width and height of parent sizes
        const parentDiv = p.canvas.parentElement;
        let canvas_w = parentDiv.clientWidth;
        let canvas_h = parentDiv.clientHeight;
        p.createCanvas(canvas_w, canvas_h).id('canvas2D');

        //set map size
        let x_padding = canvas_w * 0.1;
        let x_size_voxel = (canvas_w - 2 * x_padding) / nx_voxel;
        let y_padding = (p.height - x_size_voxel * ny_voxel) / 2;
        let y_size_voxel = x_size_voxel;

        //create the voxel map
        for (let j = 0; j < ny_voxel; j++) {
            for (let i = 0; i < nx_voxel; i++) {
                let v_index = i + nx_voxel * j;
                voxel_2D[v_index] = new Voxel_2D(x_padding + i * x_size_voxel, y_padding + j * y_size_voxel, x_size_voxel, y_size_voxel, i, j);
            }
        }
    };

    p.draw = function () {
        //draw backgroung
        p.background(bg_color);

        //show 2D voxel map
        for (let j = 0; j < ny_voxel; j++) {
            for (let i = 0; i < nx_voxel; i++) {
                let v_index = i + nx_voxel * j;
                voxel_2D[v_index].show();
            }
        }

        //selecting the voxels
        if (is_mouse_hover_C2 == true) {
            selectRect();
            for (let i = 0; i < voxel_2D.length; i++) {
                voxel_2D[i].selected();
                voxel_3D[i].v_selected = voxel_2D[i].v_selected;
            }
            voxel_selected_2D = [];
            voxel_selected_3D = [];
            _k1 = 0;
            for (let i = 0; i < voxel_2D.length; i++){
                if(voxel_2D[i].v_selected == true) {
                    voxel_selected_2D[_k1] = voxel_2D[i];
                    voxel_selected_3D[_k1] = voxel_3D[i];
                    _k1++;
                }
            }
            no_selection = voxel_selected_2D.length;
            voxelOrganize();
        }   
    };

    selectRect = function () {
        if (myp5_2.mouseIsPressed == false) {
            x = myp5_2.mouseX;
            y = myp5_2.mouseY;
        } else {
            myp5_2.fill(123, 200, 233, 100);
            selectdx = myp5_2.mouseX - x;
            selectdy = myp5_2.mouseY - y;
            tempX = x;
            tempY = y;
            myp5_2.rect(x, y, selectdx, selectdy);
        }
        RS = [myp5_2.round(tempX), myp5_2.round(tempX + selectdx), myp5_2.round(tempY), myp5_2.round(tempY + selectdy)];
    };

    voxelOrganize = function() {
        if (voxel_selected_3D.length > 0) {
            voxel_set = [];
            voxel_set[0] = voxel_selected_3D[0]; 
            for (let i = 0; i < voxel_selected_3D.length; i++) {
                for (let j = 0; j < voxel_set.length; j++) {
                    if (voxel_selected_3D[i].c1_base == voxel_set[j].c1_base && voxel_selected_3D[i].c2_base == voxel_set[j].c2_base) {
                    same_value = true;
                    break;
                    } else {
                    same_value = false;
                    }
                }
                if (same_value == false) {
                    voxel_set.push(voxel_selected_3D[i]);
                }
            }
        }
    };  

};
var myp5_2 = new p5(sketch2, 'canvas2');

function overcanvas2() {
    is_mouse_hover_C2 = true;
}

function outcanvas2() {
    is_mouse_hover_C2 = false;
}


class Voxel_2D {
    constructor(_x0, _y0, _size_rect_x, _size_rect_y, i, j) {
        this.x0 = _x0;
        this.y0 = _y0;
        this.size_rect_x = _size_rect_x;
        this.size_rect_y = _size_rect_y;
        this.index_x = i;
        this.index_y = j;
        this.v_selected = false;
        this.xf = this.x0 + this.size_rect_x;
        this.yf = this.y0 + this.size_rect_y;
        this.c1_base = '#999999';
        this.color_rect;
        this.no_selected;
    }

    show() {
        if (no_selection == 0 || no_selection == null) {
            this.color_rect = this.c1_base;
        } else {
            if (this.v_selected == true) {
                this.color_rect = this.c1_base;
            } else {
                this.color_rect = this.shadecolor(this.c1_base, -0.4);
            }
        }  
        myp5_2.fill(this.color_rect);
        myp5_2.rect(this.x0, this.y0, this.size_rect_x, this.size_rect_y);
    }

    selected() {
        if (myp5_2.mouseIsPressed == true) {
            //x0 < xf & y0 < yf 
        } else if (RS[0] <= RS[1] && RS[2] <= RS[3]) {
            P = [RS[0], RS[1], RS[2], RS[3]];
            this.v_selected = this.colider(P);
            //x0 > xf & y0 < yf
        } else if (RS[0] > RS[1] && RS[2] < RS[3]) {
            P = [RS[1], RS[0], RS[2], RS[3]];
            this.v_selected = this.colider(P);
            //x0 < xf & y0 > yf
        } else if (RS[0] < RS[1] && RS[2] > RS[3]) {
            P = [RS[0], RS[1], RS[3], RS[2]];
            this.v_selected = this.colider(P);
            //x0 > xf & y0 > yf
        } else if (RS[0] > RS[1] && RS[2] > RS[3]) {
            P = [RS[1], RS[0], RS[3], RS[2]];
            this.v_selected = this.colider(P);
        } 
    }

    colider(P) {
        if (((this.x0 < P[0] && P[0] < this.xf) || (this.x0 < P[1] && P[1] < this.xf) || (P[0] < this.x0 && P[1] > this.xf)) &&
            ((this.y0 < P[2] && P[2] < this.yf) || (this.y0 < P[3] && P[3] < this.yf) ||
            (P[2] < this.y0 && P[3] > this.yf)) || (this.x0 < P[0] && P[0] < this.xf && this.y0 < P[2] && P[3] < this.yf)) {
            return true;
        } else {
            return false;
        }
    }

    shadecolor(color, percent) {
        var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
        return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    }
}