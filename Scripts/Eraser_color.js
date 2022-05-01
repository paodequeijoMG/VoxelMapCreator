function Eraser_color() {
    if (voxel_selected_2D.length > 0) {
        for (let i = 0; i <  voxel_selected_2D.length; i++){
            voxel_selected_2D[i].c1_base = '#999999';
            voxel_selected_3D[i].c1_base = '#999999';
            voxel_selected_3D[i].c2_base = '#999999';
        }
    }
}