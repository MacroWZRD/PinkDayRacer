class Firestore{
    constructor(db, collection, query, where, addDoc, onSnapshot){
        this.db = db;
        this.collection = collection;
        this.query = query;
        this.where = where;
        this.addDoc = addDoc;
        this.onSnapshot = onSnapshot;

        this.q = this.query(this.collection(db, "players"), this.where("score", ">", -1));

        this.players = [];
        this.unsub = this.onSnapshot(this.q, (querySnapshot) => {
            this.players = []
            querySnapshot.forEach((doc) => {
                var i = this.players.push(null) - 1;
                this.players[i] = [doc.id, doc.data().name, doc.data().score];
            });
            console.log(this.players, "is the updated player list");
        });

    }

    //only reads single document so it is not used
    // 

    async addScore(db, _name, _score){
        const res = await this.addDoc(this.collection(this.db, "players"), {
        name: _name,
        score: _score
        });
    
        console.log('Added score with ID: ', res.id);
    }

    //Only reads a single document so it is not used
    // const unsub2 = onSnapshot(doc(db, "players", "test"), (doc) => {
    //  console.log("Current data: ", doc.data());
    // });



}