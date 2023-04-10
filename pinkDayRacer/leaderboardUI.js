class LeaderboardUI{
    constructor(scene, firestore){
        this.scene = scene;
        this.firestore = firestore;
        var font = {font: "32px Arial", fill: "#ffffff"};

        this.leaderboardText = this.scene.add.text(300, 150, "Leaderboard", font)
        this.leaderboardText.setAlign("left");
        this.leaderboardText.setOrigin(0.5, 0.5);
    }

    update(){
       this.leaderboardText.text = "Leaderboard\n" + this.firestore.players.toString();
    }

}