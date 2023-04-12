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
        this.firestore = new Firestore(db, collection, query, where, addDoc, onSnapshot)
        
    }

    preload(){
        this.load.image("imgBack", "img/bg.jpg");
        this.load.image('imgPlayer', 'img/player.png');
        this.load.image("eventBox", "img/eventBox.png");
        this.load.image("title", "img/title.png");
        this.load.image("gameover", "img/gameover.png");
        this.load.image("raindrops", "img/raindrops.png");
        this.load.image("anxiety", "img/anxiety.png");
        this.load.image("paint", "img/paint.png");
        this.load.audio("anxietyTheme", "img/Anxiety_Theme.mp3");
        this.load.audio("depressionTheme", "img/Depression_Theme.mp3");
        this.load.audio("mainTheme", "img/main_Theme.mp3");
        this.load.audio("endTheme", "img/end_Theme.mp3");
    }

    create(){
        var config = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };

        this.sounds = [
            this.sound.add("mainTheme", config),
            this.sound.add("endTheme", config),
            this.sound.add("depressionTheme", config),
            this.sound.add("anxietyTheme", config)
        ];

        this.main_menu();
        //manually drawn sprites
        this.sprites = [
            this.add.image(0,0,"imgPlayer").setVisible(false)
        ];

        //instances
        this.circuit = new Circuit(this);
        this.gamepad = new Gamepad(this);
        this.player = new Player(this, this.gamepad);
        this.camera = new Camera(this);

        this.input.keyboard.on("keydown-X", function(){
            this.intermission();
        }, this);

        this.input.keyboard.on("keydown-Y", function(){
            this.intermission();
        }, this);


        // // listener to pause game
        // this.input.keyboard.on("keydown-Y", function(){
        //   this.pause();
        // }, this);

        // this.events.on("resume", function(){
        //     this.settings.show();
        //     this.timeElapsed.resume();
        // }, this);
    }

    // pause(){
    //     this.settings.txtPause.text = "[Y] Resume";
    //     this.timeElapsed.pause();
    //     this.scene.pause();
    //     this.scene.launch("ScenePause");  
    // }

    main_menu(){
        this.sounds[0].play();
        console.log("played main theme");
        this.sounds[1].pause();
        this.sprBack = this.add.image(SCREEN_CX, SCREEN_CY, "imgBack");

        this.title = this.add.image(960, 250, "title");
        this.title.setOrigin(0.5, 0.5);
        this.title.alpha = 1;
        var font = {font: "64px Arial", fill: "#ffffff"};
        var players = this.firestore.players;
        if(players.length > 0){
            var t = players[0];
            this.highscore = this.add.text(960, 540, "Highscore: " + t[2] + " by " + t[1], font);
            this.highscore.setOrigin(0.5, 0.5);
            this.highscore.alpha = 1;
        }

        
        this.startText = this.add.text(960, 930, "Press X to start", font);
        this.startText.setOrigin(0.5, 0);
    }

    intermission(){
        if(state == STATE_MENU){
            state = STATE_RESTART;
            this.camera.init();
            this.player.init();
            this.settings = new Settings(this);
            this.timeElapsed = new TimeElapsed(this)
            this.gamemanager = new GameManager(this, this.player, this.camera, this.firestore, this.timeElapsed, new ScenarioUI(this, this.player, this.camera));
            this.leaderboardUI = new LeaderboardUI(this, this.firestore);
            
        }else{
            if( state == STATE_GAMEOVER){ //redraws the menu
                state = STATE_MENU;
                this.main_menu();
                for(var audio of this.sounds.values()){
                    audio.pause();
                }
                this.scene.restart();
            }
        }
       
    }

    update(time, delta){  
        this.gamepad.update();
        if(this.gamepad.button["Y"] && state == STATE_PLAY){
            this.pause();
        }

        if((this.gamepad.button["X"] && state == STATE_MENU) || (this.gamepad.button["Y"] && state == STATE_GAMEOVER)){
            this.intermission();
        }
        switch(state){
            case STATE_INIT:
                //console.log("Init game");
                state = STATE_MENU;
                break;

            case STATE_MENU:                
                console.log("IN MENU");
               
                
                this.startText.alpha = 1;
               
                break;
            case STATE_LEADERBOARD:
                this.leaderboardUI.update();
                break;

            case STATE_RESTART:
                console.log("Restart game", state);
                this.title.alpha = 0;
                if(this.highscore != null){
                    this.highscore.alpha = 0;
                }
                
                this.startText.alpha = 0;
                this.player.restart();
                this.circuit.create();
                state = STATE_PLAY;
                break;

            case STATE_PLAY:
                console.log("Playing game");
                this.startText.alpha = 0;
               
                var dt = Math.min(1, delta/1000); //duration of the time period
                this.timeElapsed.update();
                this.player.update(dt);
                this.camera.update();
                this.circuit.render3D();
                this.gamemanager.update();
    
                break;

            case STATE_GAMEOVER:
                console.log("Game over.");
                break;
        }
    }
}

// // ---------------------------------------------------------
// // Pause Scene
// // ---------------------------------------------------------
class PauseScene extends Phaser.Scene 
{
//     constructor(){
//         super({key: 'ScenePause'});
//         this.gamepad = new Gamepad(this);
//     }

//     resume(){
//         this.scene.resume("SceneMain");
//         this.scene.stop();
//     }

//     create(){
//         // listener to resume game
//         this.input.keyboard.on("keydown-Y", function(){
//             this.resume();
//         }, this);
//     }

//     update(){
//         if(this.gamepad.button["Y"]){
//             this.resume();
//         }
//     }
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