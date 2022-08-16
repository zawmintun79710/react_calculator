import { Textfit } from "react-textfit";
import './Screen.css'

const Screen = ({ value, display }) => {
    return (
      <div>
        <Textfit className="result" id='result' max={70}>{display}</Textfit>
        <Textfit className="display" id='display' max={70}>{value}</Textfit>
      </div>
    );
  };
  
  export default Screen;