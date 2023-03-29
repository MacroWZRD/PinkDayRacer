export default function loadImages(phaser){
    phaser.load.image('sky', 'assets/sky.png');
    phaser.load.image('ground', 'assets/platform.png');
    phaser.load.image('star', 'assets/star.png');
    phaser.load.image('bomb', 'assets/bomb.png');
}

export function loadSpriteSheets(phaser){
    phaser.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}