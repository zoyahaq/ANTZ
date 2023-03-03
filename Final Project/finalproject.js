
import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export class Assignment3 extends Scene {
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();

        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
        
            planetTwo: new defs.Subdivision_Sphere(3), 
            planetThre: new defs.Subdivision_Sphere(4),
            planetFour: new defs.Subdivision_Sphere(4),
            eyeball: new defs.Subdivision_Sphere(4),
            branch1: new defs.Cylindrical_Tube(15,10), 
            back_legOne: new defs.Cylindrical_Tube(15,20),
            back_legTwo: new defs.Cylindrical_Tube(15,20),
            back_legThree: new defs.Cylindrical_Tube(15,20),

            Front_legOne: new defs.Cylindrical_Tube(15,20),
            Front_legTwo: new defs.Cylindrical_Tube(15,20),
            Front_legThree: new defs.Cylindrical_Tube(15,20),
            Antenna: new defs.Cylindrical_Tube(15,20),
            // AntennaBall: new defs.Subdivision_Sphere(3), 


        

        };

        // *** Materials
        this.materials = {
            
            // TODO:  Fill in as many additional material objects as needed in this key/value table.
            planetTwo_PhoneShader: new Material(new defs.Phong_Shader(),
                {ambient: 0, diffusivity: 1, specularity: 1, color: hex_color("#C4A484")}),
            
            planetThre: new Material(new defs.Phong_Shader(),
                {ambient: 0, diffusivity: 1,specularity: 1, color: hex_color("#C4A484")}),
           
            planetFour: new Material(new defs.Phong_Shader(),
                {ambient: 0, specularity: 1, color: hex_color("#C4A484")}), 
            
            eyeball: new Material(new defs.Phong_Shader(),
                {ambient: 0, specularity: 1, color: hex_color( "#000000")}), 
    

            branch1: new Material(new defs.Phong_Shader(),
                {ambient: 0, specularity: 1, color: hex_color("#5C4033")}), 

            back_legOne: new Material(new defs.Phong_Shader(),
                {ambient: 0, specularity: 1, color: hex_color("#C4A484")}), 

            back_legTwo: new Material(new defs.Phong_Shader(),
                {ambient: 0, specularity: 1, color: hex_color("#C4A484")}), 

            back_legThree: new Material(new defs.Phong_Shader(),
                {ambient: 0, specularity: 1, color: hex_color("#C4A484")}), 

            Front_legOne: new Material(new defs.Phong_Shader(),
                {ambient: 0, specularity: 1, color: hex_color("#C4A484")}), 

            Front_legTwo: new Material(new defs.Phong_Shader(),
                {ambient: 0, specularity: 1, color: hex_color("#C4A484")}), 

            Front_legThree: new Material(new defs.Phong_Shader(),
                {ambient: 0, specularity: 1, color: hex_color("#C4A484")}), 

            // Antenna: new Material(new defs.Phong_Shader(),
            //     {ambient: 0, specularity: 1, color: hex_color("#C4A484")}), 

            // AntennBall: new Material(new defs.Phong_Shader(),
            //     {ambient: 0, specularity: 1, color: hex_color("#C4A484")}), 
        }


        this.initial_camera_location = Mat4.look_at(vec3(0, 10, 20), vec3(0, 0, 0), vec3(0, 1, 0));
    }


    display(context, program_state) {
        // display():  Called once per frame of animation.
       
       
        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(this.initial_camera_location);
        }

        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, .1, 1000);
       
            let model_transform = Mat4.identity();


     
        const light_position = vec4(0, 15, 15, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000000)];

        // Makign all the planets model_transform 
        var planetTwoTrans  = model_transform;
        var planetThreTrans = model_transform;
        var planetFourTrans  = model_transform;
        var branch1Trans = model_transform; 
        var eyeballTrans = model_transform

        var back_legOneTrans = model_transform
        var back_legTwoTrans = model_transform
        var back_legThreeTrans = model_transform

        var Front_legOneTrans = model_transform
        var Front_legTwoTrans = model_transform
        var Front_legThreeTrans = model_transform

        //var Antenna_Trans = model_transform
       // var AntennaBall_Trans = model_transform

        // All planet transformations     
        planetTwoTrans = planetTwoTrans.times((Mat4.translation(-4, 0, 0))).times(Mat4.scale(3, 3, 3));
        planetThreTrans = planetThreTrans.times((Mat4.translation(0, 0, 0))).times(Mat4.scale(2.5, 2.5, 2.5));
        planetFourTrans  = planetFourTrans.times((Mat4.translation(5, 0, 0))).times(Mat4.scale(4, 4, 4));
        branch1Trans  = planetFourTrans.times((Mat4.translation(5, 0, 0))).times(Mat4.scale(4, 4, 4));
        eyeballTrans = eyeballTrans.times((Mat4.translation(-4.5, 2.5, 2))).times(Mat4.scale(0.8, 0.8, 0.8 ));

        // Ant legs 
        back_legOneTrans = back_legOneTrans.times((Mat4.translation(0, 1, -2))).times(Mat4.rotation(Math.PI , 1, 0, 0)).times(Mat4.scale(0.5, 0.5, 5));
        back_legTwoTrans = back_legTwoTrans.times((Mat4.translation(-1.5, 1, -2))).times(Mat4.rotation(Math.PI , 1, 0, 0)).times(Mat4.scale(0.5, 0.5, 5));
        back_legThreeTrans = back_legThreeTrans.times((Mat4.translation(1.5, 1, -2))).times(Mat4.rotation(Math.PI , 1, 0, 0)).times(Mat4.scale(0.5, 0.5, 5));

        // Ant legs 
        Front_legOneTrans = Front_legOneTrans.times((Mat4.translation(0, -1, 2))).times(Mat4.rotation(Math.PI/3 , 1, 0, 0)).times(Mat4.scale(0.5, 0.5, 5));
        Front_legTwoTrans = Front_legTwoTrans.times((Mat4.translation(-1.5, -1, 2))).times(Mat4.rotation(Math.PI/3 , 1, 0, 0)).times(Mat4.scale(0.5, 0.5, 5));
        Front_legThreeTrans = Front_legThreeTrans.times((Mat4.translation(1.5, -1, 2))).times(Mat4.rotation(Math.PI/3 , 1, 0, 0)).times(Mat4.scale(0.5, 0.5, 5));


        //Antenna 
       // AntennaBall_Trans = AntennaBall.times((Mat4.translation(-4.5, 2.5, 2))).times(Mat4.scale(0.8, 0.8, 0.8 ));
        //Antenna_Trans = Antenna.times((Mat4.translation(0, 1, -2))).times(Mat4.rotation(Math.PI , 1, 0, 0)).times(Mat4.scale(0.5, 0.5, 15));
        

        // .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
 
        // Drawing all the planet shapes 
        var matTwo = this.materials.planetTwo_PhoneShader
        var matThree = this.materials.planetThre
        var matFour = this.materials.planetFour
        var branchOne = this.materials.branch1
        var matEyeball = this.materials.eyeball
        var matback_legOne = this.materials.back_legOne
        var matback_legTwo = this.materials.back_legTwo
        var matback_legThree = this.materials.back_legThree

        var matFront_legOne = this.materials.Front_legOne
        var matFront_legTwo = this.materials.Front_legTwo
        var matFront_legThree = this.materials.Front_legThree

        //var matAntenna = this.materials.Antenna
       // var matAntennaBall_Trans = this.materials.AntennaBall

        // This 
        this.shapes.planetTwo.draw(context, program_state, planetTwoTrans, matTwo)
        this.shapes.planetThre.draw(context, program_state, planetThreTrans, matThree);
        this.shapes.planetFour.draw(context, program_state, planetFourTrans , matFour);
        this.shapes.branch1.draw(context, program_state, planetFourTrans , branchOne);
        this.shapes.eyeball.draw(context, program_state, eyeballTrans , matEyeball);
        this.shapes.back_legOne.draw(context ,program_state, back_legOneTrans , matback_legOne);
        this.shapes.back_legTwo.draw(context ,program_state, back_legTwoTrans , matback_legTwo);
        this.shapes.back_legThree.draw(context ,program_state, back_legThreeTrans , matback_legThree);

        this.shapes.Front_legOne.draw(context ,program_state, Front_legOneTrans , matFront_legOne);
        this.shapes.Front_legTwo.draw(context ,program_state, Front_legTwoTrans , matFront_legTwo);
        this.shapes.Front_legThree.draw(context ,program_state, Front_legThreeTrans , matFront_legThree);


        //this.shapes.Antenna.draw(context ,program_state, Antenna_Trans , matAntenna);
       // this.shapes.AntennaBall.draw(context ,program_state, AntennaBall_Trans , matAntennaBall_Trans);
       
       
        if (this.attached != null)
            program_state.camera_inverse = this.attached().map((x,i) => Vector.from(program_state.camera_inverse[i]).mix(x, 0.1))
        else
            program_state.set_camera(this.initial_camera_location);

    
    }
}

