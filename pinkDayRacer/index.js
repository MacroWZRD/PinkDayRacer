// ---------------------------------------------------------
// Global Constants
// ---------------------------------------------------------

// screen scize
const SCREEN_W = 1920;
const SCREEN_H = 1080;

// coordinates of the screen center
const SCREEN_CX = SCREEN_W/2;
const SCREEN_CY = SCREEN_H/2;

// game states
const STATE_INIT = 1;
const STATE_RESTART = 2;
const STATE_PLAY = 3;
const STATE_GAMEOVER = 4;

// ---------------------------------------------------------
// Global Variables
// ---------------------------------------------------------

// current state
var STATE = STATE_INIT;

import mainScene from "./mainScene_module.js"
import pauseScene from "./pauseScene_module.js"

var MainScene = new mainScene(SCREEN_CX, SCREEN_CY, STATE_INIT, STATE_RESTART, STATE_PLAY, STATE_GAMEOVER, STATE);
var PauseScene = new pauseScene();

// ---------------------------------------------------------
// Initializing Phaser Game
// ---------------------------------------------------------

// game configuration
var config = {
    type: Phaser.AUTO,
    width: SCREEN_W,
    height: SCREEN_H,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    scene: [MainScene, PauseScene]
};

var game = new Phaser.Game(config);