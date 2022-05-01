change_voxel_height_up = function () {
    for (let i = 0; i < voxel_selected_3D.length; i++){
        if (voxel_selected_3D[i].factor_h < 8) {
            voxel_selected_3D[i].factor_h = voxel_selected_3D[i].factor_h + 1;
        }
    }
};

change_voxel_height_down = function () {
    for (let i = 0; i < voxel_selected_3D.length; i++){
        if (voxel_selected_3D[i].factor_h > 0) {
        voxel_selected_3D[i].factor_h = voxel_selected_3D[i].factor_h - 1;
        }
    }
};