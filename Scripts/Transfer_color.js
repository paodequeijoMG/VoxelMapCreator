function Transfer_color() {
    if (voxel_selected_2D.length > 0) {
        for (let i = 0; i <  voxel_selected_2D.length; i++){
            if (checkbox_top == true) {
                voxel_selected_2D[i].c1_base = color_temp_t;
                voxel_selected_3D[i].c1_base = color_temp_t;
            }
            if (checkbox_bottom == true) {
                voxel_selected_3D[i].c2_base = color_temp_b;
            }
        }
    }
}