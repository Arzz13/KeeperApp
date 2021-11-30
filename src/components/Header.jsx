import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";

function Header() {
  return (
    <header>
    <center>
      <HighlightIcon
        style={{
          color: "white",
          display: "inline",
          marginRight: "10px",
          fontSize: "2rem",
          position:"absolute",
          top:"24px",
          left:"11em"
        }} />
        </center>
      
      <h1>
      Keep Your Notes
      </h1>
    </header>
  );
}

export default Header;
