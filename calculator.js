const calculatorWindow = document.querySelector(".calculator-window");

// Initializing the window
let windowContent = "0";
let firstOperand = "";
let secondOperand = "";
let operator = "";
calculatorWindow.textContent = windowContent;

// Operates a . b
const add = function (a, b) {
  return parseInt(a) + parseInt(b);
};

const subtract = function (a, b) {
  return parseInt(a) - parseInt(b);
};

const multiply = function (a, b) {
  return parseInt(a) * parseInt(b);
};

const divide = function (a, b) {
  return b == 0 ? "ERROR" : parseInt(a) / parseInt(b);
};

// Peforms a two-operation calculation
const calculate = function (a, b, operation) {
  let result;

  switch (operation) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
  }

  return String(result);
};

// Processing button presses
function buttonPress(value) {
  // Reset when clear is pressed
  if (value === "Delete" || value === "Backspace") {
    windowContent = "0";
    firstOperand = "";
    secondOperand = "";
    operator = "";
    calculatorWindow.textContent = windowContent;
    return;
  }

  // If there is an error, do nothing until cleared
  if (windowContent === "ERROR") {
    return;
  }

  // If the input is a number, append it to the window content.
  // Replace leading zeros, if any.
  if (value == "0") {
    windowContent = windowContent === "0" ? "0" : windowContent + "0";
  } else if (value >= 1 && value <= 9) {
    windowContent = windowContent === "0" ? value : windowContent + value;
  }
  // If it's an operator, set up to perform an operation.
  else if (value === "+" || value === "-" || value === "*" || value === "/") {
    return;
  }
  // If equals is pressed, perform an operation if possible.
  else if (value === "Enter") {
    if (firstOperand !== "" && secondOperand !== "" && operator !== "") {
      calculate(firstOperand, secondOperand, operator);
    }
  }

  calculatorWindow.textContent = windowContent;
}

// Accepting keypresses
window.addEventListener("keydown", onKeyDown, true);

function onKeyDown(e) {
  console.log(e.key);
  buttonPress(e.key);
}
