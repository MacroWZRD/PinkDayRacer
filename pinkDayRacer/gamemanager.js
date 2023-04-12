class GameManager{
    constructor(scene, player, camera, firestore, timeElapsed, scenarioUI){
        this.scene = scene;
        this.player = player;
        this.camera = camera;
        this.firestore = firestore;
        this.timeElapsed = timeElapsed;
        this.scenarioUI = scenarioUI;
        this.section = 0;
        this.previousPlayerLaps = this.player.laps;
        this.currentScenario = -1; //-1 this will help you speed up the gameplay lol
        this.delayUntilTime = 0;
        this.duration = 0;
        this.sentScore = false; //just in case to prevent infinite write score requests
        this.hadAnxiety = false;

        this.decals = [this.scene.add.image(960, 540, "raindrops"), 
                        this.scene.add.image(960, 540, "anxiety"),
                        this.scene.add.image(960, 540, "paint")];
        this.audios = [this.scene.sounds[2], this.scene.sounds[3], this.scene.sounds[3]];
        this.mainTheme = this.scene.sounds[0];
        this.endTheme = this.scene.sounds[1];
        this.clearEffects();
    }

    assignScenario(){
        this.currentScenario++;
        var i = this.currentScenario;
        this.scenarioUI.correctIndexes = SCENARIOS[i][0]
        this.scenarioUI.update_scenario(SCENARIOS[i][1]);
        for(var ii=2; ii<SCENARIOS[i].length; ii++){
            this.scenarioUI.update_description(ii - 2, SCENARIOS[i][ii]);
        }
       
    }

    clearEffects(){
        this.mainTheme.play();
        this.hadAnxiety = false;
        this.player.maxSpeed = this.player.originalMaxSpeed;
        this.player.acceleration = this.player.originalAcceleration;

        for(var decal of this.decals.values()){
            decal.alpha = 0;
        }

        for(var _audio of this.audios.values()){
            _audio.pause();
        }
    }

    assignEffect(){
        this.clearEffects();
        var c = this.currentScenario;
        this.player.maxSpeed = this.player.originalMaxSpeed/2;
        for(var i=0; i<SCENARIOS.length; i+=2){
            if(c == i || c == i + 1){
                this.decals[Math.floor(i/2)].alpha = 1;
                this.audios[Math.floor(i/2)].play();
                this.mainTheme.pause();
                this.endTheme.pause();
                if(i == 2 || i == 3){
                    this.hadAnxiety = true;
                }
                if(i == 4 || i == 5){
                    this.player.speed = 0; //stop the car
                }
            }
        }
    }

    endGame(){
        console.log("Game ended");
        this.clearEffects()
        this.endTheme.play();
        this.mainTheme.pause();
        state = STATE_GAMEOVER;
        this.scene.add.image(960, 540, "gameover");
        this.duration = Math.floor((this.timeElapsed.currentTime - this.timeElapsed.timeStarted)/1000);
        var name = "Player" + (this.firestore.players.length + 1).toString();
        var score = Math.max(300 - this.duration, 0);
        var font = {font: "64px Arial", fill: "#ffffff"};
        var text = this.scene.add.text(960, 750, "Your score as " + name + " is " + score.toString() + "!", font);
        text.setOrigin(0.5, 0.5);
        var text = this.scene.add.text(960, 900, "Press Y to return to menu", font);
        text.setOrigin(0.5, 0.5);

        if(this.sentScore){
            return; //already sent score
        }

        this.sentScore = true;
        this.firestore.addScore(name, score);

    }

    update(){
        this.scenarioUI.update();
        if(this.hadAnxiety){
            this.camera.offsetX = (Math.random() * 200) * ((Math.random() < 0.5) ? -1 : 1);
            this.camera.offsetY = (Math.random() * 200) * ((Math.random() < 0.5) ? -1 : 1);
        }

        if(this.timeElapsed.currentTime <= this.delayUntilTime){    
            return; //still under delay
        }

        if(this.section == 0){
            this.section++;
            if(this.currentScenario >= SCENARIOS.length - 1){
                this.endGame();
                return;
            }
            this.assignScenario();
            console.log("Assigning Scenario")
            return
        }

        if(this.section == 1 && this.player.laps > this.previousPlayerLaps){
            this.section++;
            this.previousPlayerLaps = this.player.laps;
            this.scenarioUI.finished = true;
            this.delayUntilTime = this.timeElapsed.currentTime + 3000;
            if(this.scenarioUI.correctIndexes.includes(this.scenarioUI.selectedIndex)){
                console.log("Correct No Effects")
                this.clearEffects();
                return; //no negative effects applied
            }
            this.assignEffect();
            console.log("Assigning Effect")
            return
        }

        if(this.section == 2){
            console.log("Finished Assigning Effect")
            this.scenarioUI.finished = false;
            this.section = 0;
        }
    }
}