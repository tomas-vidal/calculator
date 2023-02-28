const displayBottom = document.querySelector(".calculator__display-bottom");
const displayTop = document.querySelector(".calculator__display-top");
const numberButtons = document.querySelectorAll(".numberButton");
const operationButton = document.querySelectorAll(".normalOperation");
const acButton = document.getElementById("ac");
const equalButton = document.querySelector(".equalButton");
const changeSign = document.querySelector("#changeSign");
const decimalButton = document.querySelector(".decimalButton");
let operatorDisplayBottom = false;
let operatorDisplayTop = false;
let resultDisplayed = false;
let operator;

const writeNumber = (e) => {
  if (resultDisplayed) {
    return;
  }
  if (operatorDisplayBottom) {
    displayBottom.textContent = "";
    displayTop.textContent += operator;
    operatorDisplayBottom = false;
    operatorDisplayTop = true;
  }
  displayBottom.textContent += e;
};

const selectOperation = (e) => {
  if (displayBottom.textContent === "" && displayTop.textContent === "") {
    return;
  }

  resultDisplayed = false;
  operatorDisplayBottom = true;

  if (!operatorDisplayTop) {
    operator = e;
  }

  if (operatorDisplayTop) {
    displayTop.textContent = doMath(
      displayTop.textContent,
      displayBottom.textContent
    );

    operator = e;
    displayBottom.textContent = operator;
    resultDisplayed = false;
    return;
  }
  if (displayBottom.textContent !== "" && displayTop.textContent === "") {
    displayTop.textContent = displayBottom.textContent;
    displayBottom.textContent = operator;
    return;
  }
  if (displayBottom.textContent !== operator) {
    displayBottom.textContent = operator;
    return;
  }
};

const doMath = (a, b) => {
  resultDisplayed = true;
  let number1 = Array.from(a);
  number1.pop();
  number1 = parseFloat(number1.join(""));
  let number2 = parseFloat(b);
  let result;
  switch (operator) {
    case "+":
      result = number1 + number2;
      break;
    case "-":
      result = number1 - number2;
      break;
    case "*":
      result = number1 * number2;
      break;
    case "/":
      if (number2 === 0) {
        return "ERROR";
      }
      result = number1 / number2;
      break;
    case "%":
      result = (number2 * number1) / 100;
      break;
    default:
      return;
  }
  if (result % 1 !== 0) {
    result = result.toFixed(2);
  }
  operatorDisplayTop = false;
  return result;
};

const equalFunction = () => {
  if (!operatorDisplayTop) {
    return;
  }
  displayBottom.textContent = doMath(
    displayTop.textContent,
    displayBottom.textContent
  );
  displayTop.textContent = "";
  operatorDisplayBottom = false;
  operatorDisplayTop = false;
};

const decimalFunction = () => {
  if (
    displayBottom.textContent !== "" &&
    !resultDisplayed &&
    !operatorDisplayBottom &&
    !displayBottom.textContent.includes(".")
  ) {
    displayBottom.textContent += ".";
  }
};

const acFunction = () => {
  displayBottom.textContent = "";
  displayTop.textContent = "";
  operator = null;
  operatorDisplayBottom = false;
  operatorDisplayTop = false;
  resultDisplayed = false;
};

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => writeNumber(e.target.textContent));
});

operationButton.forEach((button) => {
  button.addEventListener("click", (e) =>
    selectOperation(e.target.textContent)
  );
});

acButton.addEventListener("click", acFunction);

equalButton.addEventListener("click", equalFunction);

changeSign.addEventListener("click", () => {
  if (!operatorDisplayBottom && displayBottom.textContent !== "") {
    if (parseInt(displayBottom.textContent) > 0) {
      displayBottom.textContent = "-" + displayBottom.textContent;
    } else {
      displayBottom.textContent = displayBottom.textContent.slice(1);
    }
  }
});

decimalButton.addEventListener("click", decimalFunction);

addEventListener("keydown", (e) => {
  let key = e.key;
  // FIX THIS, DOESN'T WORK WITH A SWITCH
  if (/^[0-9]/.test(key)) {
    writeNumber(key);
    return;
  } else if (/^[/*+-]/.test(key)) {
    selectOperation(key);
    return;
  } else if (/^Enter/.test(key)) {
    equalFunction();
    return;
  } else if (/Backspace/.test(key)) {
    acFunction();
    return;
  } else if (/^[.]/.test(key)) {
    decimalFunction();
    return;
  } else {
    return;
  }
});
