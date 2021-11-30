const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  //Required to establish communication between react(client) and (server)node. Since, both origins are different ,we need both of them to comply.

const app = express();

app.use(express.json());  //method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(cors());  //Allows all corss origin requests.

//Connect node with data base.
mongoose.connect("mongodb://localhost:27017/keeperDB", {

//All three options are for using the new additions in mongodb.
    useNewUrlParser: true,  //Old url parser is deprecated.SO, to use new url parser, use this.
    useUnifiedTopology: true, //False by default. Set to true to opt in to using the MongoDB driver's new connection management engine. You should set this option to true, except for the unlikely case that it prevents you from maintaining a stable connection.
    useCreateIndex: true  //False by default. Set to true to make Mongoose's default index build use createIndex() instead of ensureIndex() to avoid deprecation warnings from the MongoDB driver.
});

const db = mongoose.connection;
db.once('open', () => console.log("Connection to database is successful"));  //Once connection established ,tell that connection is successful.Afterwards,this won't execute.


//Creating schema(blueprint of every document)
const noteSchema = {
    title: String, 
    content: String
};

//Creating a model(A constructor for creating and reading documents in the collections)
const Note = mongoose.model("Note",noteSchema);

//Get request to home route
app.get("/", function (req,res){
    
    Note.find((err,result) => {    //Find everything present in the collections created by Note model.
        
        if(err){
            console.log(err);
        } else{
            res.json(result);   //Send the result back as a json object.
            
            console.log("Get Request to / is successful");
            // console.log(result);
        }   
        
    }
    
    );
});

//When user adds new notes
app.post("/add", function(req,res){

    const newNote = new Note(req.body);  //Creating a new note using the user entered data and using "Model" constructor.
    newNote.save();  //Saving in the database

    console.log("New Note is added to database");
    // console.log(req.body);
});

//When user wants to delete data.
app.post("/delete", function(req,res){

    const noteTitle = req.body.title;
    const noteContent = req.body.content;

    //Find the note in data base using the title and content passed and delete it.
    Note.findOneAndDelete({title: noteTitle, content: noteContent}, (err) => {
        if(err){
            console.log(err);
        } else{
            console.log("Note is deleted");
            // console.log(req.body);
        }
    });
});

//Listen to the port for any requests or messages from the browser or frontEnd.
app.listen(4000, function() {
    console.log("Node Server started on port 4000");
});
