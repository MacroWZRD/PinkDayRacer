//game pad in the index.js config file must have input: { gamepad : true }
class Gamepad{
    constructor(scene){
        this.scene = scene;
        this.gamepad = this.scene.input.gamepad;
        this.enabled = false;
        this.leftJoystick = [0, 1];
        this.rightJoystick = [2, 3];

        this.leftAxis = [0, 0];
        this.rightAxis = [0, 0];

        this.button = {"A" : false, "B" : false, "X" : false, "Y" : false, "UP" : false, "DOWN" : false, "LEFT" : false, "RIGHT" : false};

    }

    update_buttons(button, pad){
        button["A"] = pad.A;
        button["B"] = pad.B;
        button["X"] = pad.X;
        button["Y"] = pad.Y;
        button["UP"] = pad.up;
        button["DOWN"] = pad.down;
        button["LEFT"] = pad.left;
        button["RIGHT"] = pad.right;
    }

    update(){
        if (this.gamepad.total == 0){
            console.log("No gamepad");
            this.enabled = false;
            return;
        }

        
        this.enabled = true;
        var pad = this.gamepad.getPad(0);
        this.update_buttons(this.button, pad);

        if (pad.axes.length){
            var l = this.leftJoystick;
            var r =  this.rightJoystick;
            this.leftAxis[0] = pad.axes[l[0]].getValue();
            this.leftAxis[1] = pad.axes[l[1]].getValue();
            this.rightAxis[0] = pad.axes[r[0]].getValue()
            this.rightAxis[1] = pad.axes[r[1]].getValue();
        }

        //console.log(this.leftAxis[0], this.leftAxis[1], this.rightAxis[0], this.rightAxis[1]);
    }
}