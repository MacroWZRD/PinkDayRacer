class Camera{
    constructor(scene){
        this.scene = scene;

        this.x = 0;
        this.y = 1000;
        this.z = 0;

        this.distToPlayer = 500;
        this.distToPlane = 100;
    }

    init(){
        this.distToPlane = 1 / (this.y / this.distToPlayer);
    }

    update(){
        var player = this.scene.player;
        var circuit = this.scene.circuit;
        this.x = player.x * circuit.roadWidth;
        this.z = player.z - this.distToPlayer;

        //don't let camera Z go to negative
        if (this.z < 0) this.z += circuit.roadLength;
    }

}