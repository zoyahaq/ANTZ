import { defs, tiny } from './examples/common.js';

// Sraavya Pradeep

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

var rTorus = 50;
var rColor = "#808081";
var leafColor = "#00FF00";
var branchColor = "#964B00";
// information on how to create all the planets
var rockInfo = { color: hex_color(rColor), diffusivity: 1, ambient: 0, specularity: 0 };
var bushInfo = { color: hex_color(leafColor), diffusivity: 1, ambient: 0, specularity: 1 };
var branchInfo = { color: hex_color(branchColor), diffusivity: 1, ambient: 1, specularity: 1 };
// other variables
var inverseTranslate = Mat4.translation(0, 0, 5);
var tree1 = [-4, 5, 0];
var tree2 = [4, 5, 0];

var rock1 = [-1, 0, -2];
var rock2 = [1, 0, 2];
var rock3 = [-1, 0, 2];

class Cube_Outline extends Shape {
    constructor() {
        super("position", "color");
        // TODO (Requirement 5).
        // When a set of lines is used in graphics, you should think of the list entries as
        // broken down into pairs; each pair of vertices will be drawn as a line segment.
        // Note: since the outline is rendered with Basic_shader, you need to redefine the position and color of each vertex

        // Draw each cube’s outline (the edges) in white
        this.arrays.position.push(...Vector3.cast(
            [1, 1, -1], [1, -1, -1], [-1, 1, 1], [-1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
            [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
            [1, -1, 1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1], [-1, -1, -1], [-1, 1, -1]));

        const white = color(1, 1, 1, 1);
        for (let i = 0; i < 24; i++) {
            this.arrays.color.push(white);
        }

        this.indexed = false;
    }
}

const directions = {
    pos_x: 0,
    neg_x: 1,
    pos_y: 2,
    neg_y: 3,
    pos_z: 4,
    neg_z: 5
};

export class FinalProject extends Scene {
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();

        this.shapes = {
            'outline': new Cube_Outline(),
            cube1: new defs.Cube(),
            sphere: new defs.Subdivision_Sphere(4),
            cylinder: new defs.Cylindrical_Tube(15, 20),


            rock1: new (defs.Subdivision_Sphere.prototype.make_flat_shaded_version())(2),
            rock2: new (defs.Subdivision_Sphere.prototype.make_flat_shaded_version())(2),
            rock3: new (defs.Subdivision_Sphere.prototype.make_flat_shaded_version())(2),
            // TREE 1
            t1l1: new defs.Subdivision_Sphere(4), t1l2: new defs.Subdivision_Sphere(4), t1l3: new defs.Subdivision_Sphere(4), t1l4: new defs.Subdivision_Sphere(4), branch1: new defs.Cylindrical_Tube(25, 15),
            t2l1: new defs.Subdivision_Sphere(4), t2l2: new defs.Subdivision_Sphere(4), t2l3: new defs.Subdivision_Sphere(4), t2l4: new defs.Subdivision_Sphere(4), branch2: new defs.Cylindrical_Tube(25, 15),

            antBody_front: new defs.Subdivision_Sphere(4),
            antBody_middle: new defs.Subdivision_Sphere(4),
            antBody_end: new defs.Subdivision_Sphere(4),
            eyeball: new defs.Subdivision_Sphere(4),
            buttDesign: new defs.Cylindrical_Tube(15, 10),
            back_legOne: new defs.Cylindrical_Tube(15, 20),
            back_legTwo: new defs.Cylindrical_Tube(15, 20),
            back_legThree: new defs.Cylindrical_Tube(15, 20),

            Front_legOne: new defs.Cylindrical_Tube(15, 20),
            Front_legTwo: new defs.Cylindrical_Tube(15, 20),
            Front_legThree: new defs.Cylindrical_Tube(15, 20),
            Antenna: new defs.Cylindrical_Tube(15, 20)
        };

        // *** Materials
        this.materials = {
            grass_block: new Material(new Gouraud_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#CDEAC0") }),
            // dirt block -- garni

            dirt_block: new Material(new Gouraud_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#b5651e") }),
            tree_block: new Material(new Gouraud_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#5C4033") }),
            grass_block: new Material(new Gouraud_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#90EE90") }),
            leaf_block: new Material(new Gouraud_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#3A5F0B") }),

            ant_block: new Material(new Gouraud_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#C4A484") }),
            food_block: new Material(new Gouraud_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#FFA500") }),
            dug_out_block: new Material(new Gouraud_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#ffffff") }),
            rock_block: new Material(new Gouraud_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#808080") }),
            rock1: new Material(new defs.Phong_Shader(), rockInfo),
            rock2: new Material(new defs.Phong_Shader(), rockInfo),
            rock3: new Material(new defs.Phong_Shader(), rockInfo),
            // TREE 1
            t1l1: new Material(new defs.Phong_Shader(), bushInfo), t1l2: new Material(new defs.Phong_Shader(), bushInfo), t1l3: new Material(new defs.Phong_Shader(), bushInfo),
            t1l4: new Material(new defs.Phong_Shader(), bushInfo), branch1: new Material(new defs.Phong_Shader(), branchInfo),

            // TREE 2
            t2l1: new Material(new defs.Phong_Shader(), bushInfo), t2l2: new Material(new defs.Phong_Shader(), bushInfo), t2l3: new Material(new defs.Phong_Shader(), bushInfo),
            t2l4: new Material(new defs.Phong_Shader(), bushInfo), branch2: new Material(new defs.Phong_Shader(), branchInfo),

            antBody_front_PhoneShader: new Material(new defs.Phong_Shader(),
                { ambient: 0, diffusivity: 1, specularity: 1, color: hex_color("#C4A484") }),
            antBody_middle: new Material(new defs.Phong_Shader(),
                { ambient: 0, diffusivity: 1, specularity: 1, color: hex_color("#C4A484") }),
            antBody_end: new Material(new defs.Phong_Shader(),
                { ambient: 0, specularity: 1, color: hex_color("#C4A484") }),
            eyeball: new Material(new defs.Phong_Shader(),
                { ambient: 0, specularity: 1, color: hex_color("#000000") }),
            buttDesign: new Material(new defs.Phong_Shader(),
                { ambient: 0, specularity: 1, color: hex_color("#5C4033") }),

            back_legOne: new Material(new defs.Phong_Shader(),
                { ambient: 0, specularity: 1, color: hex_color("#C4A484") }),

            back_legTwo: new Material(new defs.Phong_Shader(),
                { ambient: 0, specularity: 1, color: hex_color("#C4A484") }),

            back_legThree: new Material(new defs.Phong_Shader(),
                { ambient: 0, specularity: 1, color: hex_color("#C4A484") }),

            Front_legOne: new Material(new defs.Phong_Shader(),
                { ambient: 0, specularity: 1, color: hex_color("#C4A484") }),

            Front_legTwo: new Material(new defs.Phong_Shader(),
                { ambient: 0, specularity: 1, color: hex_color("#C4A484") }),

            Front_legThree: new Material(new defs.Phong_Shader(),
                { ambient: 0, specularity: 1, color: hex_color("#C4A484") }),
        }

        this.ant_locations = [];

        // The white material and basic shader are used for drawing the outline.
        // this.white = new Material(new defs);
        // this.black = new Material(new defs.Basic_Shader(), {color: hex_color("#000000")});
        this.white = new Material(new defs.Basic_Shader(),
            {});
        this.initial_camera_location = Mat4.look_at(vec3(0, 10, 20), vec3(0, 0, 0), vec3(0, 1, 0));

        this.x_chunk_max = 30;
        this.y_chunk_max = 30;
        this.z_chunk_max = 30;

        this.chunk_values = Array(this.x_chunk_max * this.y_chunk_max * this.z_chunk_max).fill(-1);
        this.dug_out_block_values = Array(this.x_chunk_max * this.y_chunk_max * this.z_chunk_max).fill(0);

        this.block_array =
            [
                this.materials.dirt_block,
                this.materials.ant_block,
                this.materials.tree_block,
                this.materials.grass_block,
                this.materials.leaf_block,
                this.materials.food_block,
                this.materials.dug_out_block,
                this.materials.rock_block //7
            ];

        this.set_block_positions([0, 30], [0, 10], [0, 30], 0);
        this.set_block_positions([0, 30], [10, 11], [0, 30], 3);

        this.set_block_positions([0, 4], [0, 4], [0, 4], 5);
        this.set_block_positions([26, 30], [0, 4], [0, 4], 5);
        this.set_block_positions([0, 4], [0, 4], [26, 30], 5);
        this.set_block_positions([26, 30], [0, 4], [26, 30], 5);

        this.set_block_positions([12, 18], [0, 22], [12, 18], 2);
        this.set_block_positions([11, 19], [22, 23], [11, 19], 4);
        this.set_block_positions([12, 18], [23, 24], [12, 18], 4);
        this.set_block_positions([13, 17], [24, 25], [13, 17], 4);
        this.set_block_positions([14, 16], [25, 26], [14, 16], 4);
        this.set_block_positions([15, 16], [26, 27], [15, 16], 4);

        this.set_block_positions([0, 1], [7, 13], [0, 3], 7);
        this.set_block_positions([1, 2], [8, 12], [0, 3], 7);
        this.set_block_positions([2, 3], [9, 11], [0, 3], 7);
        this.set_block_positions([0, 2], [9, 12], [3, 4], 7);

        this.set_block_positions([19, 21], [7, 13], [0, 3], 7);
        this.set_block_positions([18, 22], [8, 12], [0, 3], 7);
        this.set_block_positions([18, 23], [9, 11], [0, 3], 7);
        this.set_block_positions([20, 22], [9, 12], [3, 4], 7);

        this.set_block_positions([0, 1], [7, 13], [20, 22], 7);
        this.set_block_positions([1, 2], [8, 12], [20, 23], 7);
        this.set_block_positions([2, 3], [9, 11], [20, 22], 7);
        this.set_block_positions([0, 2], [9, 12], [23, 24], 7);

        this.set_block_positions([14, 16], [7, 13], [19, 23], 7);
        this.set_block_positions([13, 17], [8, 12], [20, 23], 7);
        this.set_block_positions([13, 18], [9, 11], [19, 23], 7);
        this.set_block_positions([15, 17], [9, 12], [23, 24], 7);

        this.set_block_positions([25, 27], [7, 13], [26, 28], 7);
        this.set_block_positions([24, 28], [8, 12], [25, 28], 7);
        this.set_block_positions([24, 29], [9, 11], [24, 28], 7);
        this.set_block_positions([26, 28], [9, 12], [28, 29], 7);

        this.isOutlined = false;
        this.time_diff = 0.0;
        this.frame_period = 1;
        this.pause_time = false;
    }

    make_control_panel() {
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.

        // Outline the toggle 
        this.key_triggered_button("View Digging Path", ["v"], () => { this.isOutlined = !this.isOutlined; });
        this.key_triggered_button("Add Ant Into World", ["m"], () => { this.add_ant_random(); });
        this.key_triggered_button("Reset World", ["g"], () => { this.reset_world(); });
        this.key_triggered_button("Pause Time", ["h"], () => { this.pause_time = !this.pause_time; });
        this.key_triggered_button("Increase Frame Rate", ["k"], () => { this.frame_period *= 0.9; });
        this.key_triggered_button("Decrease Frame Rate", ["j"], () => { this.frame_period *= 1.11111111111; });
        this.new_line();

    }

    add_ant_random() {
        let x = Math.floor(Math.random() * this.x_chunk_max);
        let y = Math.floor(Math.random() * this.y_chunk_max);
        let z = Math.floor(Math.random() * this.z_chunk_max);
        while (this.is_oob(x, y, z) || !this.is_adjacent_to_block(x, y, z) || !this.is_block_air(x, y, z)) {
            x = Math.floor(Math.random() * this.x_chunk_max);
            y = Math.floor(Math.random() * this.y_chunk_max);
            z = Math.floor(Math.random() * this.z_chunk_max);
        }
        this.ant_locations.push([x, y, z]);
        this.set_block_position(x, y, z, 1);
    }

    reset_world() {
        this.ant_locations = [];
        this.chunk_values = Array(this.x_chunk_max * this.y_chunk_max * this.z_chunk_max).fill(-1);
        this.dug_out_block_values = Array(this.x_chunk_max * this.y_chunk_max * this.z_chunk_max).fill(0);

        this.block_array =
            [
                this.materials.dirt_block,
                this.materials.ant_block,
                this.materials.tree_block,
                this.materials.grass_block,
                this.materials.leaf_block,
                this.materials.food_block,
                this.materials.dug_out_block,
                this.materials.rock_block //7
            ];

        this.set_block_positions([0, 30], [0, 10], [0, 30], 0);
        this.set_block_positions([0, 30], [10, 11], [0, 30], 3);

        this.set_block_positions([0, 4], [0, 4], [0, 4], 5);
        this.set_block_positions([26, 30], [0, 4], [0, 4], 5);
        this.set_block_positions([0, 4], [0, 4], [26, 30], 5);
        this.set_block_positions([26, 30], [0, 4], [26, 30], 5);

        this.set_block_positions([12, 18], [0, 22], [12, 18], 2);
        this.set_block_positions([11, 19], [22, 23], [11, 19], 4);
        this.set_block_positions([12, 18], [23, 24], [12, 18], 4);
        this.set_block_positions([13, 17], [24, 25], [13, 17], 4);
        this.set_block_positions([14, 16], [25, 26], [14, 16], 4);
        this.set_block_positions([15, 16], [26, 27], [15, 16], 4);

        this.set_block_positions([0, 1], [7, 13], [0, 3], 7);
        this.set_block_positions([1, 2], [8, 12], [0, 3], 7);
        this.set_block_positions([2, 3], [9, 11], [0, 3], 7);
        this.set_block_positions([0, 2], [9, 12], [3, 4], 7);

        this.set_block_positions([19, 21], [7, 13], [0, 3], 7);
        this.set_block_positions([18, 22], [8, 12], [0, 3], 7);
        this.set_block_positions([18, 23], [9, 11], [0, 3], 7);
        this.set_block_positions([20, 22], [9, 12], [3, 4], 7);

        this.set_block_positions([0, 1], [7, 13], [20, 22], 7);
        this.set_block_positions([1, 2], [8, 12], [20, 23], 7);
        this.set_block_positions([2, 3], [9, 11], [20, 22], 7);
        this.set_block_positions([0, 2], [9, 12], [23, 24], 7);

        this.set_block_positions([14, 16], [7, 13], [19, 23], 7);
        this.set_block_positions([13, 17], [8, 12], [20, 23], 7);
        this.set_block_positions([13, 18], [9, 11], [19, 23], 7);
        this.set_block_positions([15, 17], [9, 12], [23, 24], 7);

        this.set_block_positions([25, 27], [7, 13], [26, 28], 7);
        this.set_block_positions([24, 28], [8, 12], [25, 28], 7);
        this.set_block_positions([24, 29], [9, 11], [24, 28], 7);
        this.set_block_positions([26, 28], [9, 12], [28, 29], 7);
    }

    set_all_ant_locs() {
        for (let i = 0; i < this.ant_locations.length; i++) {
            this.set_block_position(this.ant_locations[i][0], this.ant_locations[i][1], this.ant_locations[i][2], 1)
        }
    }

    is_oob(x, y, z) {
        return x < 0 || x >= this.x_chunk_max || y < 0 || y >= this.y_chunk_max || z < 0 || z >= this.z_chunk_max;
    }

    get_next_loc(cur_x, cur_y, cur_z, dir) {
        switch (dir) {
            case directions.pos_x:
                return [cur_x + 1, cur_y, cur_z];
                break;
            case directions.neg_x:
                return [cur_x - 1, cur_y, cur_z];
                break;
            case directions.pos_y:
                return [cur_x, cur_y + 1, cur_z];
                break;
            case directions.neg_y:
                return [cur_x, cur_y - 1, cur_z];
                break;
            case directions.pos_z:
                return [cur_x, cur_y, cur_z + 1];
                break;
            case directions.neg_z:
                return [cur_x, cur_y, cur_z - 1];
                break;
        }
    }

    get_block_position(x, y, z) {
        return this.chunk_values[this.y_chunk_max * this.z_chunk_max * x + this.z_chunk_max * y + z];
    }

    set_block_position(x, y, z, val) {
        const loc = this.y_chunk_max * this.z_chunk_max * x + this.z_chunk_max * y + z;
        const ret = this.chunk_values[loc];
        this.chunk_values[loc] = val;
        return ret;
    }

    is_adjacent_to_block(x, y, z) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j < 1; j++) {
                for (let k = -1; k < 1; k++) {
                    if (i != 0 || j != 0 || k != 0) {
                        if (this.get_block_position(x + i, y + j, z + k) != -1 && this.get_block_position(x + i, y + j, z + k) != 1 && this.get_block_position(x + i, y + j, z + k) != 6) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    is_near_food_source(ant_index) {
        const cur_x = this.ant_locations[ant_index][0];
        const cur_y = this.ant_locations[ant_index][1];
        const cur_z = this.ant_locations[ant_index][2];

        let next_loc;

        for (let i = 0; i < 6; i++) {
            next_loc = this.get_next_loc(cur_x, cur_y, cur_z, i);
            if (!this.is_oob(next_loc[0], next_loc[1], next_loc[2]) && this.get_block_position(next_loc[0], next_loc[1], next_loc[2]) == 5) {
                return true;
            }
        }

        return false;
    }

    get_food_source_dir(ant_index) {
        const cur_x = this.ant_locations[ant_index][0];
        const cur_y = this.ant_locations[ant_index][1];
        const cur_z = this.ant_locations[ant_index][2];

        let next_loc;

        for (let i = 0; i < 6; i++) {
            next_loc = this.get_next_loc(cur_x, cur_y, cur_z, i);
            if (!this.is_oob(next_loc[0], next_loc[1], next_loc[2]) && this.get_block_position(next_loc[0], next_loc[1], next_loc[2]) == 5) {
                return i;
            }
        }

        return -1;
    }

    is_block_breakable(x, y, z) {
        // this.block_array = [this.materials.dirt_block, this.materials.ant_block, this.materials.tree_block, this.materials.grass_block, this.materials.leaf_block];
        const block_val = this.get_block_position(x, y, z);
        return (block_val == 0 || block_val == 3 || block_val == 5);
    }

    is_block_air(x, y, z) {
        const block_val = this.get_block_position(x, y, z);
        return (block_val == -1 || block_val == 6);
    }

    is_valid_ant_move_loc(x, y, z) {
        return !this.is_oob(x, y, z) && this.is_adjacent_to_block(x, y, z) && (this.is_block_breakable(x, y, z) || this.is_block_air(x, y, z));
    }

    get_valid_ant_moves(ant_index) {
        const cur_x = this.ant_locations[ant_index][0];
        const cur_y = this.ant_locations[ant_index][1];
        const cur_z = this.ant_locations[ant_index][2];

        let valid_moves = [];
        let next_loc;

        for (let i = 0; i < 6; i++) {
            next_loc = this.get_next_loc(cur_x, cur_y, cur_z, i);
            if (this.is_valid_ant_move_loc(next_loc[0], next_loc[1], next_loc[2])) {
                valid_moves.push(i);
            }
        }

        return valid_moves;
    }

    can_ant_move(ant_index) {
        const cur_x = this.ant_locations[ant_index][0];
        const cur_y = this.ant_locations[ant_index][1];
        const cur_z = this.ant_locations[ant_index][2];
        let next_loc;
        for (let j = 0; j < 6; j++) {
            next_loc = this.get_next_loc(cur_x, cur_y, cur_z, j);
            if (this.is_valid_ant_move_loc(next_loc[0], next_loc[1], next_loc[2])) {
                return true;
            }
        }
        return false;
    }

    can_ant_move_dir(ant_index, dir) {
        const cur_x = this.ant_locations[ant_index][0];
        const cur_y = this.ant_locations[ant_index][1];
        const cur_z = this.ant_locations[ant_index][2];
        let new_loc = this.get_next_loc(cur_x, cur_y, cur_z, dir);
        return this.is_valid_ant_move_loc(new_loc[0], new_loc[1], new_loc[2]);
    }

    move_ant_dir(ant_index, dir) {
        const cur_x = this.ant_locations[ant_index][0];
        const cur_y = this.ant_locations[ant_index][1];
        const cur_z = this.ant_locations[ant_index][2];

        if (!this.can_ant_move_dir(ant_index, dir)) {
            return false;
        }

        this.set_block_position(cur_x, cur_y, cur_z, 6);

        let new_loc = this.get_next_loc(cur_x, cur_y, cur_z, dir);
        this.set_block_position(new_loc[0], new_loc[1], new_loc[2], 1);
        this.ant_locations[ant_index] = new_loc;
        return true;
    }

    move_ant_random(ant_index) {
        const cur_x = this.ant_locations[ant_index][0];
        const cur_y = this.ant_locations[ant_index][1];
        const cur_z = this.ant_locations[ant_index][2];

        let dir;
        let food_dir;

        if (this.can_ant_move(ant_index)) {
            food_dir = this.get_food_source_dir(ant_index);
            if (food_dir != -1) {
                this.move_ant_dir(ant_index, food_dir);
            } else {
                dir = Math.floor(Math.random() * 6);
                while (!this.move_ant_dir(ant_index, dir)) {
                    dir = Math.floor(Math.random() * 6);
                }
            }

        }
    }

    set_block_positions(x_range, y_range, z_range, val) {
        const yz = this.y_chunk_max * this.z_chunk_max;
        for (let i = x_range[0]; i < x_range[1]; i++) {
            const yzi = yz * i;
            for (let j = y_range[0]; j < y_range[1]; j++) {
                const zj = this.z_chunk_max * j;
                for (let k = z_range[0]; k < z_range[1]; k++) {
                    this.chunk_values[yzi + zj + k] = val;
                }
            }
        }
    }

    display_arrayed_objects(context, program_state, shape_index, base_trans, x_range, y_range, z_range) {
        for (let i = 0; i < this.x_chunk_max; i++) {
            for (let j = 0; j < this.y_chunk_max; j++) {
                for (let k = 0; k < this.z_chunk_max; k++) {
                    const b_position = this.get_block_position(i, j, k);
                    if (b_position != -1) {
                        if (b_position == 1) {
                            const trans_origin = base_trans.times(Mat4.translation(2 * i, 2 * j, 2 * k));
                            const front_body = trans_origin.times(Mat4.translation(-0.7, 0, 0)).times(Mat4.scale(.7, .7, .7))
                            const middle_body = trans_origin.times(Mat4.scale(.6, .6, .6))
                            const back_body = trans_origin.times(Mat4.translation(1, 0, 0)).times(Mat4.scale(.9, .9, .9))

                            const leg_front = trans_origin.times(Mat4.translation(-0.3, 0, 0.5)).times(Mat4.rotation(220 * (Math.PI / 180), 1, 0, 0)).times(Mat4.scale(.2, .2, 1))
                            const leg_middle = trans_origin.times(Mat4.translation(0, 0, 0.5)).times(Mat4.rotation(220 * (Math.PI / 180), 1, 0, 0)).times(Mat4.scale(.2, .2, 1))
                            const leg_back = trans_origin.times(Mat4.translation(0.3, 0, 0.5)).times(Mat4.rotation(220 * (Math.PI / 180), 1, 0, 0)).times(Mat4.scale(.2, .2, 1))


                            const b_leg_front = trans_origin.times(Mat4.translation(-0.3, -0.5, -0.5)).times(Mat4.rotation(100 * (Math.PI / 180), 1, 0, 0)).times(Mat4.scale(.2, .2, 1))
                            const b_leg_middle = trans_origin.times(Mat4.translation(0, -0.5, -0.5)).times(Mat4.rotation(100 * (Math.PI / 180), 1, 0, 0)).times(Mat4.scale(.2, .2, 1))
                            const b_leg_back = trans_origin.times(Mat4.translation(0.3, -0.5, -0.5)).times(Mat4.rotation(100 * (Math.PI / 180), 1, 0, 0)).times(Mat4.scale(.2, .2, 1))

                            // antBody_frontTrans = antBody_frontTrans.times((Mat4.translation(-.4, 0.5, 0))).times(Mat4.scale(.3, .3, .3));

                            this.shapes.sphere.draw(context,
                                program_state,
                                middle_body,
                                this.materials.ant_block);

                            this.shapes.sphere.draw(context,
                                program_state,
                                front_body,
                                this.materials.ant_block);

                            this.shapes.sphere.draw(context,
                                program_state,
                                back_body,
                                this.materials.ant_block);

                            this.shapes.cylinder.draw(context,
                                program_state,
                                leg_front,
                                this.materials.back_legOne);

                            this.shapes.cylinder.draw(context,
                                program_state,
                                leg_middle,
                                this.materials.back_legOne);

                            this.shapes.cylinder.draw(context,
                                program_state,
                                leg_back,
                                this.materials.back_legOne);

                            this.shapes.cylinder.draw(context,
                                program_state,
                                b_leg_front,
                                this.materials.back_legOne);

                            this.shapes.cylinder.draw(context,
                                program_state,
                                b_leg_middle,
                                this.materials.back_legOne);

                            this.shapes.cylinder.draw(context,
                                program_state,
                                b_leg_back,
                                this.materials.back_legOne);
                        }
                        else if (this.isOutlined) {
                            if (b_position == 6) {
                                this.shapes.cube1.draw(context,
                                    program_state,
                                    base_trans.times(Mat4.translation(2 * i, 2 * j, 2 * k)),
                                    this.block_array[b_position]);
                            }
                        } else if (b_position != 6) {
                            this.shapes.cube1.draw(context,
                                program_state,
                                base_trans.times(Mat4.translation(2 * i, 2 * j, 2 * k)),
                                this.block_array[b_position]);
                        }
                    }
                }
            }
        }
    }

    time_step() {
        for (let i = 0; i < this.ant_locations.length; i++) {
            this.move_ant_random(i);
        }
    }

    display(context, program_state) {
        // display():  Called once per frame of animation.
        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(this.initial_camera_location);
        }

        const light_position = vec4(0, 5, 5, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)]
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, .1, 1000);

        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
        const yellow = hex_color("#fac91a");
        let model_transform = Mat4.identity();

        this.time_diff += dt;

        // const grass_trans = model_transform.times(Mat4.scale(15, 0.1, 15))
        const dirt_trans = model_transform.times(Mat4.translation(-30, -50, -100))


        // drawing all the blocks 
        this.display_arrayed_objects(context, program_state, this.materials.dirt_block, dirt_trans);


        var rockTransform = Mat4.identity();
        var treeTransform = Mat4.identity();

        //rocks
        this.rock1 = Mat4.inverse(rockTransform.times(inverseTranslate));
        this.rock2 = Mat4.inverse(rockTransform.times(inverseTranslate));
        this.rock3 = Mat4.inverse(rockTransform.times(inverseTranslate));

        // tree 1
        this.t1l1 = Mat4.inverse(treeTransform.times(inverseTranslate));
        this.t1l2 = Mat4.inverse(treeTransform.times(inverseTranslate));
        this.t1l3 = Mat4.inverse(treeTransform.times(inverseTranslate));
        this.t1l4 = Mat4.inverse(treeTransform.times(inverseTranslate));
        this.branch1 = Mat4.inverse(treeTransform.times(inverseTranslate));


        // tree 2
        this.t2l1 = Mat4.inverse(treeTransform.times(inverseTranslate));
        this.t2l2 = Mat4.inverse(treeTransform.times(inverseTranslate));
        this.t2l3 = Mat4.inverse(treeTransform.times(inverseTranslate));
        this.t2l4 = Mat4.inverse(treeTransform.times(inverseTranslate));
        this.branch2 = Mat4.inverse(treeTransform.times(inverseTranslate));

        var antBody_frontTrans = model_transform;
        var antBody_middleTrans = model_transform;
        var antBody_endTrans = model_transform;
        var buttDesignTrans = model_transform;
        var eyeballTrans = model_transform

        var back_legOneTrans = model_transform
        var back_legTwoTrans = model_transform
        var back_legThreeTrans = model_transform

        var Front_legOneTrans = model_transform
        var Front_legTwoTrans = model_transform
        var Front_legThreeTrans = model_transform

        // All planet transformations     
        antBody_frontTrans = antBody_frontTrans.times((Mat4.translation(-.4, 0.5, 0))).times(Mat4.scale(.3, .3, .3));
        antBody_middleTrans = antBody_middleTrans.times((Mat4.translation(0, 0.5, 0))).times(Mat4.scale(.25, .25, .25));
        antBody_endTrans = antBody_endTrans.times((Mat4.translation(.5, 0.5, 0))).times(Mat4.scale(.4, .4, .4));
        buttDesignTrans = antBody_endTrans.times((Mat4.translation(.5, 0.5, 0))).times(Mat4.scale(.4, .4, .4));
        eyeballTrans = eyeballTrans.times((Mat4.translation(-.45, 0.75, .2))).times(Mat4.scale(.08, .08, .08));

        // Ant legs 
        back_legOneTrans = back_legOneTrans.times((Mat4.translation(0, 0.6, -.2))).times(Mat4.rotation(Math.PI, 1, 0, 0)).times(Mat4.scale(.05, .05, .5));
        back_legTwoTrans = back_legTwoTrans.times((Mat4.translation(-.15, 0.6, -.2))).times(Mat4.rotation(Math.PI, 1, 0, 0)).times(Mat4.scale(.05, .05, .5));
        back_legThreeTrans = back_legThreeTrans.times((Mat4.translation(.15, 0.6, -.2))).times(Mat4.rotation(Math.PI, 1, 0, 0)).times(Mat4.scale(.05, .05, .5));

        // Ant legs 
        Front_legOneTrans = Front_legOneTrans.times((Mat4.translation(0, 0.4, .2))).times(Mat4.rotation(Math.PI / 3, 1, 0, 0)).times(Mat4.scale(.05, .05, .5));
        Front_legTwoTrans = Front_legTwoTrans.times((Mat4.translation(-.15, 0.4, .2))).times(Mat4.rotation(Math.PI / 3, 1, 0, 0)).times(Mat4.scale(.05, .05, .5));
        Front_legThreeTrans = Front_legThreeTrans.times((Mat4.translation(.15, 0.4, .2))).times(Mat4.rotation(Math.PI / 3, 1, 0, 0)).times(Mat4.scale(.05, .05, .5));

        // Drawing all the planet shapes
        var matTwo = this.materials.antBody_front_PhoneShader
        var matThree = this.materials.antBody_middle
        var matFour = this.materials.antBody_end
        var branchOne = this.materials.buttDesign
        var matEyeball = this.materials.eyeball
        var matback_legOne = this.materials.back_legOne
        var matback_legTwo = this.materials.back_legTwo
        var matback_legThree = this.materials.back_legThree

        var matFront_legOne = this.materials.Front_legOne
        var matFront_legTwo = this.materials.Front_legTwo
        var matFront_legThree = this.materials.Front_legThree

        if (!this.pause_time && this.time_diff > this.frame_period) {
            this.time_step();
            this.time_diff = 0.0;
        }

    }
}

class Gouraud_Shader extends Shader {
    // This is a Shader using Phong_Shader as template

    constructor(num_lights = 2) {
        super();
        this.num_lights = num_lights;
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return ` 
        precision mediump float;
        const int N_LIGHTS = ` + this.num_lights + `;
        uniform float ambient, diffusivity, specularity, smoothness;
        uniform vec4 light_positions_or_vectors[N_LIGHTS], light_colors[N_LIGHTS];
        uniform float light_attenuation_factors[N_LIGHTS];
        uniform vec4 shape_color;
        uniform vec3 squared_scale, camera_center;

        // Specifier "varying" means a variable's final value will be passed from the vertex shader
        // on to the next phase (fragment shader), then interpolated per-fragment, weighted by the
        // pixel fragment's proximity to each of the 3 vertices (barycentric interpolation).
        varying vec3 N, vertex_worldspace;


        varying vec4 gouraud;
        // ***** PHONG SHADING HAPPENS HERE: *****                                       
        vec3 phong_model_lights( vec3 N, vec3 vertex_worldspace ){                                        
            // phong_model_lights():  Add up the lights' contributions.
            vec3 E = normalize( camera_center - vertex_worldspace );
            vec3 result = vec3( 0.0 );
            for(int i = 0; i < N_LIGHTS; i++){
                // Lights store homogeneous coords - either a position or vector.  If w is 0, the 
                // light will appear directional (uniform direction from all points), and we 
                // simply obtain a vector towards the light by directly using the stored value.
                // Otherwise if w is 1 it will appear as a point light -- compute the vector to 
                // the point light's location from the current surface point.  In either case, 
                // fade (attenuate) the light as the vector needed to reach it gets longer.  
                vec3 surface_to_light_vector = light_positions_or_vectors[i].xyz - 
                                               light_positions_or_vectors[i].w * vertex_worldspace;                                             
                float distance_to_light = length( surface_to_light_vector );

                vec3 L = normalize( surface_to_light_vector );
                vec3 H = normalize( L + E );
                // Compute the diffuse and specular components from the Phong
                // Reflection Model, using Blinn's "halfway vector" method:
                float diffuse  =      max( dot( N, L ), 0.0 );
                float specular = pow( max( dot( N, H ), 0.0 ), smoothness );
                float attenuation = 1.0 / (1.0 + light_attenuation_factors[i] * distance_to_light * distance_to_light );

                vec3 light_contribution = shape_color.xyz * light_colors[i].xyz * diffusivity * diffuse
                                                          + light_colors[i].xyz * specularity * specular;
                result += attenuation * light_contribution;
            }
            return result;
        } `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        return this.shared_glsl_code() + `
            attribute vec3 position, normal;                            
            // Position is expressed in object coordinates.

            uniform mat4 model_transform;
            uniform mat4 projection_camera_model_transform;

            void main(){                                                                   
                // The vertex's final resting place (in NDCS):
                gl_Position = projection_camera_model_transform * vec4( position, 1.0 );
                // The final normal vector in screen space.
                N = normalize( mat3( model_transform ) * normal / squared_scale);
                vertex_worldspace = ( model_transform * vec4( position, 1.0 ) ).xyz;


                gouraud = vec4( shape_color.xyz * ambient, shape_color.w );
                gouraud.xyz = gouraud.xyz + phong_model_lights( N, vertex_worldspace );

            } `;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        // A fragment is a pixel that's overlapped by the current triangle.
        // Fragments affect the final image or get discarded due to depth.
        return this.shared_glsl_code() + `
            void main(){
                // Compute an initial (ambient) color:
                gl_FragColor = gouraud;
                // Compute the final color with contributions from lights:
                //gl_FragColor.xyz += phong_model_lights( normalize( N ), vertex_worldspace );
                return;

            } `;
    }

    send_material(gl, gpu, material) {
        // send_material(): Send the desired shape-wide material qualities to the
        // graphics card, where they will tweak the Phong lighting formula.
        gl.uniform4fv(gpu.shape_color, material.color);
        gl.uniform1f(gpu.ambient, material.ambient);
        gl.uniform1f(gpu.diffusivity, material.diffusivity);
        gl.uniform1f(gpu.specularity, material.specularity);
        gl.uniform1f(gpu.smoothness, material.smoothness);
    }

    send_gpu_state(gl, gpu, gpu_state, model_transform) {
        // send_gpu_state():  Send the state of our whole drawing context to the GPU.
        const O = vec4(0, 0, 0, 1), camera_center = gpu_state.camera_transform.times(O).to3();
        gl.uniform3fv(gpu.camera_center, camera_center);
        // Use the squared scale trick from "Eric's blog" instead of inverse transpose matrix:
        const squared_scale = model_transform.reduce(
            (acc, r) => {
                return acc.plus(vec4(...r).times_pairwise(r))
            }, vec4(0, 0, 0, 0)).to3();
        gl.uniform3fv(gpu.squared_scale, squared_scale);
        // Send the current matrices to the shader.  Go ahead and pre-compute
        // the products we'll need of the of the three special matrices and just
        // cache and send those.  They will be the same throughout this draw
        // call, and thus across each instance of the vertex shader.
        // Transpose them since the GPU expects matrices as column-major arrays.
        const PCM = gpu_state.projection_transform.times(gpu_state.camera_inverse).times(model_transform);
        gl.uniformMatrix4fv(gpu.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        gl.uniformMatrix4fv(gpu.projection_camera_model_transform, false, Matrix.flatten_2D_to_1D(PCM.transposed()));

        // Omitting lights will show only the material color, scaled by the ambient term:
        if (!gpu_state.lights.length)
            return;

        const light_positions_flattened = [], light_colors_flattened = [];
        for (let i = 0; i < 4 * gpu_state.lights.length; i++) {
            light_positions_flattened.push(gpu_state.lights[Math.floor(i / 4)].position[i % 4]);
            light_colors_flattened.push(gpu_state.lights[Math.floor(i / 4)].color[i % 4]);
        }
        gl.uniform4fv(gpu.light_positions_or_vectors, light_positions_flattened);
        gl.uniform4fv(gpu.light_colors, light_colors_flattened);
        gl.uniform1fv(gpu.light_attenuation_factors, gpu_state.lights.map(l => l.attenuation));
    }



    update_GPU(context, gpu_addresses, gpu_state, model_transform, material) {
        // update_GPU(): Define how to synchronize our JavaScript's variables to the GPU's.  This is where the shader
        // recieves ALL of its inputs.  Every value the GPU wants is divided into two categories:  Values that belong
        // to individual objects being drawn (which we call "Material") and values belonging to the whole scene or
        // program (which we call the "Program_State").  Send both a material and a program state to the shaders
        // within this function, one data field at a time, to fully initialize the shader for a draw.

        // Fill in any missing fields in the Material object with custom defaults for this shader:
        const defaults = { color: color(0, 0, 0, 1), ambient: 0, diffusivity: 1, specularity: 1, smoothness: 40 };
        material = Object.assign({}, defaults, material);

        this.send_material(context, gpu_addresses, material);
        this.send_gpu_state(context, gpu_addresses, gpu_state, model_transform);
    }
}

class Ring_Shader extends Shader {
    update_GPU(context, gpu_addresses, graphics_state, model_transform, material) {
        // update_GPU():  Defining how to synchronize our JavaScript's variables to the GPU's:
        const [P, C, M] = [graphics_state.projection_transform, graphics_state.camera_inverse, model_transform],
            PCM = P.times(C).times(M);
        context.uniformMatrix4fv(gpu_addresses.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        context.uniformMatrix4fv(gpu_addresses.projection_camera_model_transform, false,
            Matrix.flatten_2D_to_1D(PCM.transposed()));
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return `
        precision mediump float;
        varying vec4 point_position;
        varying vec4 center;
        `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        return this.shared_glsl_code() + `
        attribute vec3 position;
        uniform mat4 model_transform;
        uniform mat4 projection_camera_model_transform;

        void main(){
          gl_Position = projection_camera_model_transform * vec4(position, 1.0);
          point_position = model_transform * vec4(position, 1.0);
          center = model_transform * vec4(0.0, 0.0, 0.0, 1.0);
        }`;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        return this.shared_glsl_code() + `
        void main(){
            gl_FragColor = vec4(0.69,0.502,0.251, cos(20.0*length(point_position.xyz - center.xyz)));
        }`;
    }
}