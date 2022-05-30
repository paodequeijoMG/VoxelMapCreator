let color_temp_t = '#999999';
let color_temp_b = '#999999';

const color_picked = document.getElementById("color_picker");


function paint_divs() {
    // Get the checkbox
    var color_picked = document.getElementById("input_color");
    var div_top = document.getElementById("voxel_color_top"); 
    var div_bottom = document.getElementById("voxel_color_bottom");

    // If the checkbox is checked, display the output text
    if (checkbox_top == true){
        div_top.style.backgroundColor = color_picked.style.backgroundColor;
        color_temp_t = RGBtoHEX(color_picked.style.backgroundColor);
    }
    if (checkbox_bottom == true){
        div_bottom.style.backgroundColor = color_picked.style.backgroundColor;
        color_temp_b = RGBtoHEX(color_picked.style.backgroundColor);
    }
}

function RGBtoHEX(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hexCode(i) {
        return ("0" + parseInt(i).toString(16)).slice(-2);
        }
    return "#" + hexCode(rgb[1]) + hexCode(rgb[2]) + hexCode(rgb[3]);
}


new KellyColorPicker({
    //place the canvas in a id div
    place : 'picker', 
    //creat a input to show the value
    input : 'input_color',
    // canvas size  
    size: 200, 
    // initial color
    color: '#999999',
    // or 'quad'
    method: 'triangle',
    // applies theselected color to the background of the input
    inputColor: true,
    // hex or rgba or mixed
    inputFormat: 'mixed',
    // from 0 to 1
    alpha: 1,
    // shows alpha slider
    alphaSlider: false,
    // auto re-init on window resize
    resizeWith: true
});