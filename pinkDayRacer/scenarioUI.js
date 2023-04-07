class ScenarioUI{
    constructor(scene, player, camera){
        this.scene = scene;
        var font = {font: "32px Arial", fill: "#ffffff"};

        this.scenarioBox = this.scene.add.image(970, 150, "eventBox");
        this.scenarioText = this.scene.add.text(970, 150, "This is an example scenario that shows \n the amount of text the box can handle \n It can fit a little more than that!", font)
        this.scenarioText.setOrigin(0.5, 0.5);

        this.finished = false;

        this.player = player;
        this.camera = camera;
        this.originalcameraX = camera.x;

        this.selectedColour = "#FFB3C6";
        this.unselectedColour = "#000000"
        var startX = 645;
        var startY = 700;
        this.options = [this.scene.add.text(startX, startY, "Option A", font),
                        this.scene.add.text(startX, startY, "Option B", font),
                        this.scene.add.text(startX, startY, "Option C", font),
                        this.scene.add.text(startX, startY, "Option D", font),
                        this.scene.add.text(startX, startY, "Option E", font)];

        var startX = 1450;
        var startY = 265;
        this.optionDescriptions = [this.scene.add.text(startX, startY, "A: Sample Decision or action", font),
                                   this.scene.add.text(startX, startY, "B: Sample Decision or action", font),
                                   this.scene.add.text(startX, startY, "C: Sample Decision or action", font),
                                   this.scene.add.text(startX, startY, "D: Sample Decision or action", font),
                                   this.scene.add.text(startX, startY, "E: Sample Decision or action", font)];
        var i = 0; 
        for(var description of this.optionDescriptions.values()){
            description.y = startY + 75 * i
            i++;
        }
        this.selectedOption = "";
    }

    update_scenario(scenario){
        this.scenarioText.text = scenario;
    }

    update_description(index, description){
        this.optionDescriptions[index].text = String.fromCharCode(index + 65) + ": " + description; 
    }

    update(){
        var offset = (this.originalcameraX - this.camera.x)/3
        var i = 0;
        var startX = 645 + offset;
        for(var option of this.options.values()){
            option.x = startX + 170 * i
            option.setOrigin(0.5 ,0.5);
            if (this.finished){
                option.setBackgroundColor((this.selectedOption.charCodeAt() - 65 == i) ? this.selectedColour : this.unselectedColour);
            }else{
                option.setBackgroundColor((this.player.lane == i) ? this.selectedColour : this.unselectedColour);
                this.selectedOption = (this.player.lane == i) ? String.fromCharCode(65 + i) : this.selectedOption;
            }
            
            i++;
        }
    }

}