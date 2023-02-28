const displayBottom = document.querySelector(".calculator__display-bottom");
const displayTop = document.querySelector(".calculator__display-top");
const numberButtons = document.querySelectorAll(".numberButton");
const operationButton = document.querySelectorAll(".normalOperation");
const acButton = document.getElementById("ac");
const equalButton = document.querySelector(".equalButton");
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
  let number2 = parseInt(b);
  number1.pop();
  number1 = parseInt(number1.join(""));
  switch (operator) {
    case "+":
      return number1 + number2;
    case "-":
      return number1 - number2;
    case "*":
      return number1 * number2;
    case "/":
      return number1 / number2;
    default:
      return;
  }
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
  displayBottom.textContent = doMath(
    displayTop.textContent,
    displayBottom.textContent
  );
  displayTop.textContent = "";
  operatorDisplayBottom = false;
  operatorDisplayTop = false;
});
