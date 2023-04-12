class TimeElapsed{
    constructor(scene){
        this.scene = scene
        var date = new Date();
        this.timeStarted = date.getTime();
        this.currentTime = this.timeStarted;
        this.timePaused = 0;
        var font = {font: "32px Arial", fill: "#ffffff"};
        this.txtTimeElapsed = scene.add.text(1720, 50, "", font);
    }

    pause(){
        var date = new Date();
        console.log(this.timePaused);
        this.timePaused = date.getTime();
    }

    resume(){
        var date = new Date();
        this.timeStarted += date.getTime() - this.timePaused;
    }

    update(){
        var date = new Date();
        var deltaTime = date.getTime() - this.timeStarted;
        this.currentTime = date.getTime();
        this.txtTimeElapsed.text = "Time: " + Math.floor(deltaTime/1000) + "s";
    }
}