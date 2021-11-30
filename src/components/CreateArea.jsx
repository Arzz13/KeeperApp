//This file is used for creating the textarea when users start typing in a text box or clicks add . 
import React,{useState} from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from '@material-ui/core/Fab';
import Zoom from "@material-ui/core/Zoom";// Zoom adds a Zoom animation to a component. 


function CreateArea(props) {

  //Storing the state whether text area is expanded or not.Initially, the text area shouldn't be expanded
   const [isExpanded, setIsExpanded] = React.useState(false);

  //When user clicks the text area, it should expand.
  function expandfunction() {
    setIsExpanded(true);
  }

 //Having State for a note and a hook function for updating it.
  const[note,setNote]=useState({
    title:"",
    content:""
});

//When user types in title or content then update the state.
function typeNote(event){
    const {name,value}=event.target; //Get event.name and event.value from event target and store in name and value variable.
    setNote(prevNote=>{
        return {
            ...prevNote,     //If content is added when title is already present,then while adding the content,title should be preserved. So, prevValue is used.Similarly,for the otherway.
            [name]:value    //Newly set name equal to value. i.e, it handels title adding case as well as content adding case.
        };
    });
}

function addNote(event){
    event.preventDefault();   //when button is clicked,page doesn't reload.
    props.addFunction(note);  //(Add function is defined in App.jsx).Here,new Note object is passed to add function which is defined in app component, when submit button is clicked.
    //Clear the state after adding
    setNote({
        title: "",
        content: ""
      });    
}
  
  return (

    <div >   
      <form className="create-note">
        {isExpanded && (   //If is expanded is true the expression after '&&' is executed/
          <input
            name="title"
            onChange={typeNote}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
        name="content"
          onChange={typeNote}
          onClick={expandfunction} //Expand when the text area is clicked
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
             {/*When expanded the button is visible*/}
             <Zoom in={isExpanded}> 
        <Fab onClick={addNote}>   {/* Floating button */}

          <AddIcon />  {/* incorporating add icon as a button that can be used */ }
        </Fab>
      
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
