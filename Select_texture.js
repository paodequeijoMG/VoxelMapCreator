const top_textures = document.getElementsByClassName("top-image");
const bottom_textures = document.getElementsByClassName("bottom-image");
let img_select_number_top;
let img_select_number_bottom;

function Select_texture_top(event) {

    //selecting and stylize the div texture
    for (let i = 0; i < top_textures.length; i++) {
        top_textures[i].checked = false;
    }
    var div_top_target = event.target;
    div_top_target.checked = !div_top_target.checked;
    for (let i = 0; i < top_textures.length; i++) {
        if(top_textures[i].checked == true) {
            top_textures[i].style.boxShadow = "0 0 5px 4px white";
        } else {
            top_textures[i].style.boxShadow  = "none";
        }
    }
    img_select_number_top = div_top_target.getAttribute('data-value');
}


function Select_texture_bottom(event) {

    //selecting and stylize the div texture
    for (let i = 0; i < bottom_textures.length; i++) {
        bottom_textures[i].checked = false;
    }
    var div_bottom_target = event.target;
    div_bottom_target.checked = !div_bottom_target.checked;
    for (let i = 0; i < bottom_textures.length; i++) {
        if(bottom_textures[i].checked == true) {
            bottom_textures[i].style.boxShadow = "0 0 5px 4px white";
        } else {
            bottom_textures[i].style.boxShadow  = "none";
        }
    }
    img_select_number_middle = String(div_bottom_target.getAttribute('data-value'))[0];
    img_select_number_bottom = String(div_bottom_target.getAttribute('data-value'))[1];
}
