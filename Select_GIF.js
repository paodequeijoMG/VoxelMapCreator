const top_gifs = document.getElementsByClassName("top_gif");
let gif_select_number;


function Select_gif(event) {
    //selecting and stylize the div texture
    for (let i = 0; i < top_gifs.length; i++) {
        top_gifs[i].checked = false;
    }
    var div_top_target = event.target;
    div_top_target.checked = !div_top_target.checked;
    for (let i = 0; i < top_gifs.length; i++) {
        if(top_gifs[i].checked == true) {
            top_gifs[i].style.boxShadow = "0 0 5px 4px white";
        } else {
            top_gifs[i].style.boxShadow  = "none";
        }
    }
    gif_select_number = div_top_target.getAttribute('data-value');
}