const paint_tab = document.getElementById('Paint_container');
const image_tab = document.getElementById('Image_container');
const gif_tab = document.getElementById('GIF_container');
let tab_mode = 1;

function Transfer_content() {
    if (voxel_selected_2D.length > 0 && paint_tab.style.display == 'grid') {
        tab_mode = 1;
        for (let i = 0; i <  voxel_selected_2D.length; i++) {
            voxel_selected_2D[i].color_rect = color_temp_t;
            voxel_selected_3D[i].color_top = color_temp_t;
            voxel_selected_3D[i].color_bottom = color_temp_b;
        }
    }
    if (voxel_selected_2D.length > 0 && image_tab.style.display == 'grid' && (img_select_number_top >= 0 && img_select_number_bottom >= 0)) {
        tab_mode = 2;
        for (let i = 0; i <  voxel_selected_2D.length; i++) {
            voxel_selected_2D[i].img_selection = img_select_number_top;
            voxel_selected_2D[i].show_mode = 2;
            voxel_selected_3D[i].img_selection_top = img_select_number_top;
            voxel_selected_3D[i].img_selection_middle = img_select_number_middle - 1;
            voxel_selected_3D[i].img_selection_bottom = img_select_number_bottom - 1;
            voxel_selected_3D[i].show_mode = 2;
        }   
    }
    if (voxel_selected_2D.length > 0 && gif_tab.style.display == 'grid' && gif_select_number >= 0) {
        tab_mode = 3;
        for (let i = 0; i <  voxel_selected_2D.length; i++) {
            voxel_selected_2D[i].gif_selection = gif_select_number;
            voxel_selected_2D[i].show_mode = 3;
            voxel_selected_3D[i].gif_selection = gif_select_number;
            voxel_selected_3D[i].show_mode = 3;
        }   
    }
}