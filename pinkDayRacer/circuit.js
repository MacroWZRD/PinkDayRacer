class Circuit
{
    constructor(scene){
        // reference to the game scene
        this.scene = scene;

        // array of road segments
        this.segments = [];

        // single segment length
        this.segmentLength = 100;

        // road width (half of the road)
        this.roadWidth = 1000;
    }

    create(){
        this.segments = [];

        this.createRoad();
    }

    createRoad(){
        this.createSection(10);
    }

    createSection(nSegments){
       for (var i=0; i < nSegments; i++){
        this.createSegment();
       } 
    }

    createSegment(){
        var n = this.segments.length;
        
        // add new segment
        this.segments.push({
            index: n,

            point: {
                world: {x: 0, y: 0, z: n*this.segmentLength},
                screen: {x: 0, y: 0, z: 0},
                scale: -1
            },

            color: {road: "0x888888"}
        })
    }

    render2D(){

    }
}