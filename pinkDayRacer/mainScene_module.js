// ---------------------------------------------------------
// Main Scene
// ---------------------------------------------------------
export default class MainScene extends Phaser.Scene 
{
    constructor(SCREEN_CX, SCREEN_CY, STATE_INIT, STATE_RESTART, STATE_PLAY, STATE_GAMEOVER){
        super({key: 'SceneMain'});
        this.SCREEN_CX = SCREEN_CX;
        this.SCREEN_CY = SCREEN_CY;
        this.STATE_INIT = STATE_INIT;
        this.STATE_RESTART = STATE_RESTART;
        this.STATE_PLAY = STATE_PLAY;
        this.STATE_GAMEOVER = STATE_GAMEOVER;
    }

    preload(){
        this.load.image("imgBack", "img/bg.jpg");
    }

    create(){
        // backgrounds
        this.sprBack = this.add.image(this.SCREEN_CX, this.SCREEN_CY, "imgBack");

        //instances
        this.circuit = new Circuit(this);
        this.settings = new Settings(this);

        // listener to pause game
        this.input.keyboard.on("keydown-P", function(){
            this.settings.txtPause.text = "[P] Resume"
            this.scene.pause();
            this.scene.launch("ScenePause");
        }, this);

        this.events.on("resume", function(){
            this.settings.show();
        }, this);
    }

    update(state, time, delta){
        switch(state){
            case this.STATE_INIT:
                console.log("Init game");
                state = this.STATE_RESTART;
                break;

            case this.STATE_RESTART:
                console.log("Restart game");

                this.circuit.create();

                state = this.STATE_PLAY;
                break;

            case this.STATE_PLAY:
                console.log("Playing game");
                // state = STATE_GAMEOVER;
                break;

            case this.STATE_GAMEOVER:
                console.log("Game over.");
                break;
        }
    }
}