// ---------------------------------------------------------
// Firebase Constants
// ---------------------------------------------------------

// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import { getFirestore, collection, query, where, addDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDBbkYU0HNdRIJETCp1WyDEc_0sbOyBqIY",
authDomain: "pink-21ee8.firebaseapp.com",
projectId: "pink-21ee8",
storageBucket: "pink-21ee8.appspot.com",
messagingSenderId: "522157463316",
appId: "1:522157463316:web:928718ced10a3951a75401",
measurementId: "G-ERTYZDFYY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// ---------------------------------------------------------
// Main Scene
// ---------------------------------------------------------
class MainScene extends Phaser.Scene 
{
    constructor(){
        super({key: 'SceneMain'});
    }

    preload(){
        this.load.image("imgBack", "img/bg.jpg");
        this.load.image('imgPlayer', 'img/player.png');
        this.load.image("eventBox", "img/eventBox.png")
    }

    create(){
        // backgrounds
        this.sprBack = this.add.image(SCREEN_CX, SCREEN_CY, "imgBack");

        //manually drawn sprites
        this.sprites = [
            this.add.image(0,0,"imgPlayer").setVisible(false)
        ];
        
        //instances
        this.circuit = new Circuit(this);
        this.camera = new Camera(this);
        this.gamepad = new Gamepad(this);
        this.player = new Player(this, this.gamepad);
        this.firestore = new Firestore(db, collection, query, where, addDoc, onSnapshot)
        this.settings = new Settings(this);
        this.timeElapsed = new TimeElapsed(this);
        this.scenarioUI = new ScenarioUI(this, this.player, this.camera);
        this.leaderboardUI = new LeaderboardUI(this, this.firestore);
       
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

    update(time, delta){   
        switch(state){
            case STATE_INIT:
                console.log("Init game");

                this.camera.init();
                this.player.init();

                state = STATE_RESTART;
                break;

            case STATE_RESTART:
                console.log("Restart game");
                this.player.restart();
                this.circuit.create();

                state = STATE_PLAY;
                break;

            case STATE_PLAY:
                //console.log("Playing game");
                var dt = Math.min(1, delta/1000); //duration of the time period
                this.timeElapsed.update();
                this.player.update(dt);
                this.gamepad.update();
                this.camera.update();
                this.circuit.render3D();
                this.scenarioUI.update(); //This will probably be called later 
                this.leaderboardUI.update();
                //from some GameManager rather than index (a js made for spawning stuff and managing ui)

                //console.log(this.player.lane);
                if (this.player.laps > 0){
                    state = STATE_GAMEOVER;
                }
                // 
                break;

            case STATE_GAMEOVER:
                //console.log("Game over.");
                break;
        }
    }
}

// ---------------------------------------------------------
// Pause Scene
// ---------------------------------------------------------
class PauseScene extends Phaser.Scene 
{
    constructor(){
        super({key: 'ScenePause'});
    }

    create(){
        // listener to resume game
        this.input.keyboard.on("keydown-P", function(){
            this.scene.resume("SceneMain");
            this.scene.stop();
        }, this);
    }
}

// ---------------------------------------------------------
// Initializing Phaser Game
// ---------------------------------------------------------

// game configuration
var config = {
    type: Phaser.AUTO,
    width: SCREEN_W,
    height: SCREEN_H,

    input: {
        gamepad : true
    },

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    scene: [MainScene, PauseScene]
};

var game = new Phaser.Game(config);