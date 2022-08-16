import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import './App.css'

const btnValues = [
  {id:"clear",value:'AC'},{id:'addminus',value:"+-"},{id:'percent',value:"%"},{id:'divide',value:'/'},
  {id:'seven',value:7}, {id:'eight',value:8}, {id:'nine',value:9}, {id:'multiply',value:"x"},
  {id:'four',value:4}, {id:'five',value:5}, {id:'six',value:6}, {id:'subtract',value:"-"},
  {id:'one',value:1}, {id:'two',value:2}, {id:'three',value:3}, {id:'add',value:"+"},
  {id:'zero',value:0}, {id:'decimal',value:"."}, {id:'equals',value:"="}
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");


const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });
let [display, setDisplay] = useState('');

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    
    setDisplay(display.concat(value));

      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });    
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setDisplay(display.concat(value));
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setDisplay(display.concat(value));
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = (e) => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "x"
          ? a * b 
          : sign === "/" 
          ? a / b
          : sign === "+"
          ? a + b
          : a - b
               
      
      setDisplay(display.concat(e.target.innerHTML));
      
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = (e) => {

    setDisplay(display.concat(e.target.innerHTML));
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = (e) => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setDisplay(display.concat(e.target.innerHTML));
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setDisplay('');
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.sign ? calc.sign : calc.res} display={display} />
      <ButtonBox>
        {btnValues.map((btn) => {
          return (
            <Button
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
                  : btn.value === "/" || btn.value === "x" || btn.value === "-" || btn.value === "+"
                  ? signClickHandler
                  : btn.value === "."
                  ? commaClickHandler
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