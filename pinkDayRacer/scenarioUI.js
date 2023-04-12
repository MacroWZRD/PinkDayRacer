class ScenarioUI{
    constructor(scene, player, camera){
        this.scene = scene;
        var font2 = {font: "32px Arial", fill: "#942224"};
       
        var font = {font: "32px Arial", fill: "#ffffff", backgroundColor: "#ffffff"};
        var font5 = {font: "32px Arial", fill: "#942224", backgroundColor: "#FFA3CB"};
        var font3 = {font: "32px Arial", fill: "#942224", backgroundColor: "#FF97B1"};
        var font4 = {font: "32px Arial", fill: "#942224", backgroundColor: "#FF7CA0"};

        this.scenarioBox = this.scene.add.image(970, 200, "eventBox");
        this.scenarioText = this.scene.add.text(930, 200, "", font2)
        this.scenarioText.setOrigin(0.5, 0.5);

        this.finished = false;
        this.correctIndexes = [];

        this.player = player;
        this.camera = camera;
        this.originalcameraX = camera.x;

        this.selectedColour = "#FFB3C6";
        this.correctColour = "#3AFFBA";
        this.unselectedColour = "#000000"
        var startY = 700;
        this.options = [this.scene.add.text(0, startY, "Option A", font),
                        this.scene.add.text(0, startY, "Option B", font),
                        this.scene.add.text(0, startY, "Option C", font)];//,
                        //this.scene.add.text(startX, startY, "Option D", font),
                        //this.scene.add.text(startX, startY, "Option E", font)];

        var startX = 1250;
        var startY = 400;
        this.optionDescriptions = [this.scene.add.text(startX, startY, "A: Sample Decision or action", font5),
                                   this.scene.add.text(startX, startY, "B: Sample Decision or action", font3),
                                   this.scene.add.text(startX, startY, "C: Sample Decision or action", font4)];//,
                                   //this.scene.add.text(startX, startY, "D: Sample Decision or action", font),
                                   //this.scene.add.text(startX, startY, "E: Sample Decision or action", font)];
        var i = 0; 
        for(var description of this.optionDescriptions.values()){
            description.y = startY + 125 * i
            i++;
        }
        this.selectedOption = "";
        this.selectedIndex = 0;
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
        this.selectedIndex = this.player.lane;
        for(var option of this.options.values()){
            option.x = startX + 225 * i
            option.setOrigin(0.5 ,0.5);
            if (this.finished){
                option.setBackgroundColor((this.selectedOption.charCodeAt() - 65 == i) ? this.selectedColour : this.unselectedColour);
                if(this.correctIndexes.includes(i)){
                    option.setBackgroundColor(this.correctColour);
                }
            }else{
                option.setBackgroundColor((this.player.lane == i) ? this.selectedColour : this.unselectedColour);
                this.selectedOption = (this.player.lane == i) ? String.fromCharCode(65 + i) : this.selectedOption;
                
            }   
            
            i++;
        }
    }

}