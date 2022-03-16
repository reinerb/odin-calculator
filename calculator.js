const calculatorWindow = document.querySelector(".calculator-window");
const MAX_SIG_FIGS = 12;

// Initializing the window
let displayValue = "0";
let lastDisplayValue = "";
let operator = "";
let currentDisplayValue;
let windowReset = false;
calculatorWindow.textContent = displayValue;

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

  console.log(result);

  return String(result);
};

// Processing button presses
const buttonPress = function (value) {
  // Reset when clear is pressed
  if (value === "Delete" || value === "Backspace") {
    displayValue = "0";
    lastDisplayValue = "";
    operator = "";
    windowReset = false;
    calculatorWindow.textContent = displayValue;
    return;
  }

  // If there is an error, do nothing until cleared
  if (displayValue === "ERROR") {
    return;
  }

  // If the input is a number, append it to the window content.
  // Replace leading zeros, if any.
  if (value == "0") {
    displayValue =
      displayValue === "0" || windowReset ? "0" : displayValue + "0";
    windowReset = false;
  } else if (value >= 1 && value <= 9) {
    displayValue =
      displayValue === "0" || windowReset ? value : displayValue + value;
    windowReset = false;
  }
  // If it's an operator, set up to perform an operation.
  else if (value === "+" || value === "-" || value === "*" || value === "/") {
    if (lastDisplayValue === "" && operator === "") {
      lastDisplayValue = displayValue;
      operator = value;
      windowReset = true;
    } else if (operator === "") {
      operator = value;
      windowReset = true;
    } else {
      currentDisplayValue = displayValue;
      displayValue = calculate(lastDisplayValue, displayValue, operator);
      lastDisplayValue = displayValue;
      operator = value;
      windowReset = true;
    }
  }
  // If equals is pressed, perform an operation if possible.
  else if (value === "Enter") {
    if (lastDisplayValue !== "" && operator !== "") {
      displayValue = calculate(lastDisplayValue, displayValue, operator);
      lastDisplayValue = displayValue;
      operator = "";
      windowReset = true;
    }
  }

  calculatorWindow.textContent = displayValue;
};

// Accepting keypresses
const onKeyDown = function (e) {
  console.log(e.key);
  buttonPress(e.key);
};

window.addEventListener("keydown", onKeyDown, true);
