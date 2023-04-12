class Settings
{
    constructor(scene){
        this.scene = scene;

        var font = {font: "32px Arial", fill: "#ffffff"};
        this.txtPause = scene.add.text(1720, 5, "", font);

        this.show();
    }

    show(){
        //this.txtPause.text = "[Y] Pause";
    }
}
