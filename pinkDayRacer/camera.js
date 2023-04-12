class Camera{
    constructor(scene){
        this.scene = scene;

        this.x = 0;
        this.DefaultY = 1000;
        this.y = this.DefaultY;
        this.z = 0;

        this.distToPlayer = 500;
        this.distToPlane = 100;

        this.offsetX = 0;
        this.offsetY = 0;
    }

    init(){
        this.distToPlane = 1 / (this.y / this.distToPlayer);
    }

    update(){
        var player = this.scene.player;

        var circuit = this.scene.circuit;
        this.x = player.x * circuit.roadWidth + this.offsetX;
        this.y = this.DefaultY + this.offsetY;
        this.z = player.z - this.distToPlayer;
        this.offsetX = 0;
        this.offsetY = 0;
        //don't let camera Z go to negative
        if (this.z < 0) this.z += circuit.roadLength;
    }

}