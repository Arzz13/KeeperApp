import React,{useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {


  const [isExpanded,setIsExpanded]=useState(false);


    const[note,setNote]=useState({
        title:"",
        content:""
    });

    function handleChange(event){
        const {name,value}=event.target; //Get event.name and event.value from event target and store in name and value variable.
        setNote(prevNote=>{
            return {
                ...prevNote,     //If content is added when title is already present,then while adding the content,title should be preserved. So, prevValue is used.Similarly,for the otherway.
                [name]:value    //Newly set name equal to value. i.e, it handels title adding case as well as content adding case.
            };
        });
    }
    function submitNote(event){
        event.preventDefault();   //when button is clicked,page doesn't reload.
        props.add(note);  //Note object passed to add function in app component when submit button is clicked.
        setNote({
            title: "",
            content: ""
          });    
    }
    function expand(){
      setIsExpanded(true);
    }
  return (
    <div>
      <form className="create-note">
      {isExpanded? <input
       name="title" 
       onChange={handleChange} 
       value={note.title}
        placeholder="Title" /> 
        :null}

        <textarea 
        name="content" 
        onClick={expand}
        onChange={handleChange} 
        value={note.content} 
        placeholder="Take a note..." 
        rows={isExpanded ?3:1} />
        <Zoom in={isExpanded}>
        <Fab onClick={submitNote}>

          <AddIcon />
        </Fab>
</Zoom>
      </form>
    </div>
  );
}

export default CreateArea;