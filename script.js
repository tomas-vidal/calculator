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
  displayBottom.textContent += e.target.textContent;
};

const selectOperation = (e) => {
  if (displayBottom.textContent === "" && displayTop.textContent === "") {
    return;
  }
  operatorDisplayBottom = true;
  resultDisplayed = false;

  if (!operatorDisplayTop) {
    operator = e.target.textContent;
  }
  if (operatorDisplayTop) {
    displayTop.textContent = doMath(
      displayTop.textContent,
      displayBottom.textContent
    );

    operator = e.target.textContent;
    displayBottom.textContent = operator;
    resultDisplayed = false;
    return;
  }
  if (displayBottom.textContent !== "" && displayTop.textContent === "") {
    displayTop.textContent = displayBottom.textContent;
    displayBottom.textContent = operator;
  }
  if (displayBottom.textContent !== operator) {
    displayBottom.textContent = operator;
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
      result = number1 / number2;
      break;
    default:
      return;
  }
  if (result % 1 !== 0) {
    result = result.toFixed(2);
  }
  return result;
};

numberButtons.forEach((button) => {
  button.addEventListener("click", writeNumber);
});

operationButton.forEach((button) => {
  button.addEventListener("click", selectOperation);
});

acButton.addEventListener("click", () => {
  displayBottom.textContent = "";
  displayTop.textContent = "";
  operator = null;
  operatorDisplayBottom = false;
  operatorDisplayTop = false;
  resultDisplayed = false;
});

equalButton.addEventListener("click", () => {
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
});

changeSign.addEventListener("click", () => {
  if (!operatorDisplayBottom && displayBottom.textContent !== "") {
    if (parseInt(displayBottom.textContent) > 0) {
      displayBottom.textContent = "-" + displayBottom.textContent;
    } else {
      displayBottom.textContent = displayBottom.textContent.slice(1);
    }
  }
});

decimalButton.addEventListener("click", () => {
  if (
    displayBottom.textContent !== "" &&
    !resultDisplayed &&
    !operatorDisplayBottom &&
    !displayBottom.textContent.includes(".")
  ) {
    displayBottom.textContent += ".";
  }
});
