class Player{
    constructor(scene, gamepad){
        this.scene = scene;
        this.gamepad = gamepad;
        this.cursors = this.scene.input.keyboard.createCursorKeys(); //For keyboard input events
        this.scene.game.input.gamepad;//.start();
        //this.gamepad = this.scene.input.gamepad;
        this.A_KEY = this.scene.input.keyboard.addKey(65);
        this.D_KEY = this.scene.input.keyboard.addKey(68);
        this.sprite = scene.sprites[PLAYER]

        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = (this.sprite.width/1000)*2;

        this.left = false;
        this.right = false;

        this.screen = {x:0, y:0, w:0, h:0};

        //max speed (to avoid moving for more than 1 road segment, assuming 60 fps)
        this.maxSpeed = (scene.circuit.segmentLength) / (1/60);

        this.speed = 0; //current speed

        this.maxTurnSpeed = 1;
        this.turnSpeed = 0;
        this.turnClamp = [-0.9, 0.9];

        this.numLanes = 5;
        this.lanesLines = [0, 0, 0, 0, 0, 0];
        var d = (this.turnClamp[1] - this.turnClamp[0])/this.numLanes;
        console.log(d);
        for(var i=0; i < this.numLanes + 1; i++){
            this.lanesLines[i] = this.turnClamp[0] + d * i;
        }

        this.lane = 0;
        this.laps = 0;
    }

    init(){
        //set the player screen size
        this.screen.w = this.sprite.width;
        this.screen.h = this.sprite.height;

        //set the player screen position
        this.screen.x = SCREEN_CX;
        this.screen.y = SCREEN_H - this.screen.h/2;
       
    }

    restart(){
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.speed = this.maxSpeed;
        this.turnSpeed = 0;
        this.lane = 0;
        this.laps = 0;
    }

    turning(){
        if (!this.gamepad.enabled){
            this.turnSpeed = (this.cursors.left.isDown || this.A_KEY.isDown) ? -this.maxTurnSpeed : 0;
            this.turnSpeed = (this.cursors.right.isDown || this.D_KEY.isDown) ? this.maxTurnSpeed : this.turnSpeed;
        }else{
            this.turnSpeed = this.gamepad.leftAxis[0] * this.maxTurnSpeed;
            console.log(this.gamepad.leftAxis[0], this.gamepad.leftAxis[1]);
        }
       
    }

    lanes(){
        for(var i=0; i < this.numLanes; i++){
            if(this.lanesLines[i] <= this.x && this.x <= this.lanesLines[i + 1]){
                this.lane = i;
                return
            } 
        }
    }


    update(dt){
        this.turnSpeed = 0;
        this.turning();
        this.lanes();
        var circuit = this.scene.circuit;
        this.z += this.speed * dt;
        this.x += this.turnSpeed * dt
        this.x = Math.max(Math.min(this.x, this.turnClamp[1]), this.turnClamp[0]);
        if (this.z >= circuit.roadLength) {
            this.z -= circuit.roadLength;
            this.laps += 1;
        }
    }
}