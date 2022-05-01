let checkbox_top = false;
let checkbox_bottom = false;
let cb_top = document.getElementById('voxel_texture_top');
let cb_bottom = document.getElementById('voxel_texture_bottom');

change_color_top = function () {
    checkbox_top = !checkbox_top;
    if (checkbox_top == true) {
        cb_top.style.border = '3px solid #000000';
        cb_top.style.opacity = '1';
    } else {
        cb_top.style.opacity = '0.5';
    }
};

change_color_bottom = function () {
    checkbox_bottom = !checkbox_bottom;
    if (checkbox_bottom == true) {
        cb_bottom.style.border = 'border: 3px solid #000000';
        cb_bottom.style.opacity = '1';
    } else {
        cb_bottom.style.opacity = '0.5';
    }
};

overTOP = function () {
    if (checkbox_top == false) {
        cb_top.style.border = '3px solid #000000';
    } 
}

outTOP = function () {
    if (checkbox_top == false) {
        cb_top.style.border = '1px solid #000000';
    }
}

overBOTTOM = function () {
    if (checkbox_bottom == false) {
        cb_bottom.style.border = '3px solid #000000';
    }
}

outBOTTOM = function () {
    if (checkbox_bottom == false) {
        cb_bottom.style.border = '1px solid #000000';
    }
}