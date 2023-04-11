class ScenarioUI{
    constructor(scene, player, camera){
        this.scene = scene;
        var font = {font: "32px Arial", fill: "#ffffff"};

        this.scenarioBox = this.scene.add.image(970, 200, "eventBox");
        this.scenarioText = this.scene.add.text(930, 200, " \
        Your friend is just recovering from a break-up, now their ex\n \
        is posting defamatory things on social media. Now you notice\n \
        that they are worse. They're always sad, listening to \n \
        depressing songs, always putting themselves down, and now \n \
        you notice cuts on their arms. What do you do?", font)
        this.scenarioText.setOrigin(0.5, 0.5);

        this.finished = false;

        this.player = player;
        this.camera = camera;
        this.originalcameraX = camera.x;

        this.selectedColour = "#FFB3C6";
        this.unselectedColour = "#000000"
        var startY = 700;
        this.options = [this.scene.add.text(0, startY, "Option A", font),
                        this.scene.add.text(0, startY, "Option B", font),
                        this.scene.add.text(0, startY, "Option C", font)];//,
                        //this.scene.add.text(startX, startY, "Option D", font),
                        //this.scene.add.text(startX, startY, "Option E", font)];

        var startX = 1250;
        var startY = 400;
        this.optionDescriptions = [this.scene.add.text(startX, startY, "A: Sample Decision or action", font),
                                   this.scene.add.text(startX, startY, "B: Sample Decision or action", font),
                                   this.scene.add.text(startX, startY, "C: Sample Decision or action", font)];//,
                                   //this.scene.add.text(startX, startY, "D: Sample Decision or action", font),
                                   //this.scene.add.text(startX, startY, "E: Sample Decision or action", font)];
        var i = 0; 
        for(var description of this.optionDescriptions.values()){
            description.y = startY + 100 * i
            i++;
        }
        this.selectedOption = "";
        this.update_description(0, "Tell them to get over it, and ditch them!")
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
        var startX = 735 + offset;
        for(var option of this.options.values()){
            option.x = startX + 225 * i
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