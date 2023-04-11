class GameManager{
    constructor(scene, timeElapsed, scenarioUI){
        this.scene = scene;
        this.timeElapsed = timeElapsed;
        this.scenarioUI = scenarioUI;
    }

    update(){
        this.timeElapsed.update();
        this.scenarioUI.update();
    }
}