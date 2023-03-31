class TimeElapsed{
    constructor(scene){
        this.scene = scene
        var date = new Date();
        this.timeStarted = date.getTime();
        var font = {font: "32px Arial", fill: "#ffffff"};
        this.txtTimeElapsed = scene.add.text(1720, 50, "", font);
    }

    update(){
        var date = new Date();
        var deltaTime = date.getTime() - this.timeStarted;
        this.txtTimeElapsed.text = "Time: " + Math.floor(deltaTime/1000) + "s";
    }
}