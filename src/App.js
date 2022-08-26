import React,{useState} from "react";
import { Textfit } from "react-textfit";
import "./App.css"


const btnValues = [
  {id:"clear",value:'AC'},{id:'addminus',value:"+-"},{id:'percent',value:"%"},{id:'divide',value:'/'},
  {id:'seven',value:7}, {id:'eight',value:8}, {id:'nine',value:9}, {id:'multiply',value:"*"},
  {id:'four',value:4}, {id:'five',value:5}, {id:'six',value:6}, {id:'subtract',value:"-"},
  {id:'one',value:1}, {id:'two',value:2}, {id:'three',value:3}, {id:'add',value:"+"},
  {id:"rotate", value:"rotate"},{id:'zero',value:0},{id:'decimal',value:"."}, {id:'equals',value:"="}
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");


const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const Wrapper = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

const Screen = ({ value, display }) => {
    return (
      <div>
        <Textfit className="result" id='result' max={70}>{display}</Textfit>
        <Textfit className="display" id='display' max={70}>{value}</Textfit>
      </div>
    );
  };

const ButtonBox = ({ children }) => {
  return <div className="buttonBox">{children}</div>;
};

const Button = ({ className, value, id, onClick }) => {
  return (
    <button className={className} onClick={onClick} id={id}>
      {value}
    </button>
  );
};


const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    result: 0,
  });
let [display, setDisplay] = useState('');

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    
    setDisplay(display === "" && value === "0"
            ? "0"
            : (display < 1 && value >= 0 && display.includes(".")) || display >=1
            ? display+value
            : calc.sign
            ? display+value
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value)
    );

      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : (display < 1 && value >= 0 && display.includes(".")) || display >=1
            ? display.concat(value)
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(removeSpaces(calc.num + value)),
        result: !calc.sign ? 0 : calc.result,
      });    
  };

  const decimalClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

  // setDisplay(!calc.num.toString().includes(value) ? calc.num + value: /[*/+-]/g.test(display) && !calc.num.toString().includes(value) ? display +calc.num+ value : calc.num);
  setDisplay((calc.num === 0 && display === "") ? calc.num + value : calc.num.toString().includes(value) ? calc.num : display + value)
    
    setCalc({
      ...calc,
      num: (calc.num === 0 && display === "") ? calc.num + value : calc.num.toString().includes(value) ? calc.num : display + value,
    });
  };

  const operatorClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    
    function replaceOp(display){
      let array = display.split("")
      let result = array.splice(array.length-1,1,value)
      return array.join("")
      }

    setCalc({
      ...calc,
      sign: display === "" ? (calc.num + value).slice(0,1) : value,
      result: !calc.result && calc.num ? calc.num : calc.result,
      num: 0,
    });

  setDisplay(display.includes("=") ? calc.result + value :display === "" ? calc.num + value :display.endsWith(display[display.length-1].match(/[*/+-]/g))? replaceOp(display): display + value);
  };

  const equalsClickHandler = (e) => {
    
    if (calc.sign && calc.num) {             
      
      setCalc({
        ...calc,
        result: Function("return "+display)(),
        sign: "",
        num: 0,               
  });
  setDisplay(display+e.target.innerHTML);
}
}

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      result: calc.result ? toLocaleString(removeSpaces(calc.result) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let result = calc.result ? parseFloat(removeSpaces(calc.result)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      result: (result /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setDisplay("");
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      result: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.sign ? calc.sign : calc.result} display={display} />
      <ButtonBox>
        {btnValues.map((btn,index) => {
          return (
            <Button
              key={index}
              id={btn.id}
              value={btn.value}
              onClick={
                btn.value === "AC"
                  ? resetClickHandler
                  : btn.value === "+-"
                  ? invertClickHandler
                  : btn.value === "%"
                  ? percentClickHandler
                  : btn.value === "="
                  ? equalsClickHandler
                  : btn.value === "/" || btn.value === "*" || btn.value === "-" || btn.value === "+"
                  ? operatorClickHandler
                  : btn.value === "."
                  ? decimalClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;