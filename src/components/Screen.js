import { Textfit } from "react-textfit";
import './Screen.css'

const Screen = ({ value }) => {
    return (
      <div>
        
        <Textfit className="display" id='display' max={70}>{value}</Textfit>
      </div>
    );
  };
  
  export default Screen;