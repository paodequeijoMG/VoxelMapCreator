const bch = getComputedStyle(document.documentElement).getPropertyValue('--border-color-hover');
const bwh = getComputedStyle(document.documentElement).getPropertyValue('--border-width-hover');
const bwa = getComputedStyle(document.documentElement).getPropertyValue('--border-width-active');
const br = getComputedStyle(document.documentElement).getPropertyValue('--border-radius');
const bc = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');

let checkbox_top = false;
let checkbox_bottom = false;
const cb_top = document.getElementById('voxel_color_top');
const cb_bottom = document.getElementById('voxel_color_bottom');

Change_color_top = function () {
    checkbox_bottom = false;
    checkbox_top = !checkbox_top;
    //top modifier
    if (checkbox_top == true) {
        cb_top.style.borderColor = bch;
        cb_top.style.borderWidth = bwa;
        cb_top.style.opacity = '1';
    } else {
        cb_top.style.borderColor = bc;
    }
    //bottom modifier
    if (checkbox_bottom == true) {
        cb_bottom.style.borderColor = bch;
        cb_bottom.style.borderWidth = bwa;
        cb_bottom.style.opacity = '1';
    } else {
        cb_bottom.style.borderColor = bc;
    }
};

Change_color_bottom = function () {
    checkbox_top = false;
    checkbox_bottom = !checkbox_bottom;
    //top modifier
    if (checkbox_top == true) {
        cb_top.style.borderColor = bch;
        cb_top.style.borderWidth = bwa;
        cb_top.style.opacity = '1';
    } else {
    cb_top.style.borderColor = bc;
    }
    //bottom modifier
    if (checkbox_bottom == true) {
        cb_bottom.style.borderColor = bch;
        cb_bottom.style.borderWidth = bwa;
        cb_bottom.style.opacity = '1';
    } else {
        cb_bottom.style.borderColor = bc;
    }
};