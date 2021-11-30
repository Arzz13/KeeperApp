//For deleting a note item

import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  
  function deleteNote() {

	props.deleteFunction({    // i.e,It means (props.deleteNote ).Since deleteFunction = deleteNode.(deleteNote is the important one to delete. deleteFunction is here just to call that function. It reduces code in App.jsx. 
                          //Since ,we have to change the notesArr when deleting,we are having the main delete function in App.jsx.
      id: props.id,
      title: props.title,
      content: props.content
    });
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={deleteNote}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
