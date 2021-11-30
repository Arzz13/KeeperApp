import React from "react";
import axios from "axios";  //Allows us to make requests to server (or any endpoint).Has then() function for easier error handling and alternate for callback functions. 
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

const url = "http://localhost:4000";  //We use axios to make request to this endpoint.Server listens to this endpoint only. 

function App() {

  //Using hooks for changing states as and when something happens.

  const [notesArr, setNotesArr] = React.useState([]);  //Creates state for the component which can be changed.

  //Whenever rerendering(setNotesArr is called),useEffect is also called.
  React.useEffect(() => {   //Function to be rerun.
    axios.get(url+"/")    //Get request to home route, so that we can render all the notes in the database.
      .then((res) => {     //When get request promise is fulfilled ,then this is executed.
       
        setNotesArr(res.data)    //Change the state based on the response data received from the database linked with server. {Note : Res.data gets json object since we told the server to send response as a json object.So, can be directly used here.}
      })
      .catch((err) => console.error(err));   //If any error
  });

  function addNote(noteObj) {
    
    setNotesArr([...notesArr, noteObj]);  //using spread operator to update array
    
    axios.post(url+"/add", noteObj)     //Post to the server in add route, when user adds a note.So, that database is updated.
      .catch((err) => console.log(err));
  }

  //When users clicks delete icon in a note
  function deleteNote(noteObj) {

    setNotesArr(notesArr.filter((EachNoteItem, index) => {
      return index !== noteObj.id; //When index not equal to the id of object then,it will be sent to setNotes for updating array.If its equal then it wont be updated.It will be filtered.
    }));
    axios
    .post(url+"/delete", 
    { //Request object
      title: noteObj.title,    
      content: noteObj.content
    })
    .catch((err) => console.log(err));
  }

  return (
    <div>
      <Header />
       <CreateArea addFunction={addNote} />  {/*  Calling CreateArea component and sending addFunction as a parameter. So, addFunction is equal to addNote */}
      { 
        notesArr.map((noteItem,index)=>{
          return (                      // We return here but we dont store what the map function returns.To avoid error ,we have return statement. 
            <Note 
            key={index} 
            id={index} 
            title={noteItem.title} 
            content={noteItem.content} 
            deleteFunction={deleteNote}
            />
          );
      })

      }
      <Footer />
    </div>
  );
}

export default App;
