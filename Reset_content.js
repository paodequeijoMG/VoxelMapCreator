function Reset_content() {
    if (voxel_selected_2D.length > 0) {
        for (let i = 0; i <  voxel_selected_2D.length; i++){
            voxel_selected_2D[i].color_rect = base_color;
            voxel_selected_2D[i].show_mode = 1;
            voxel_selected_3D[i].color_top = base_color;
            voxel_selected_3D[i].color_bottom = base_color;
            voxel_selected_3D[i].show_mode = 1;
        }
    }
}