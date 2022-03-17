const calculatorWindow = document.querySelector(".calculator-window");
const MAX_SIG_FIGS = 12;
const BUTTONS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "*",
  "/",
  "Enter",
  "Backspace",
  "Delete",
  ".",
];

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

// Finding the correct button for the given key
const findButton = function (key) {
  let className = `.btn-${key}`;
  return document.querySelector(className);
};

const onKeyDown = function (e) {
  key = e.key;
  let button;
  if (BUTTONS.indexOf(key) !== -1) {
    if (key >= 0 && key <= 9) {
      button = findButton(key);
    } else {
      switch (key) {
        case "Delete":
        case "Backspace":
          button = findButton("clear");
          break;
        case "+":
          button = findButton("plus");
          break;
        case "-":
          button = findButton("minus");
          break;
        case "*":
          button = findButton("times");
          break;
        case "/":
          button = findButton("divide");
          break;
        case "Enter":
          button = findButton("equals");
          break;
        case ".":
          button = findButton("decimal");
          break;
      }
    }
  }
  if (button) button.classList.add("btn-pressed");
  buttonPress(key);
};

const onKeyUp = function (e) {
  key = e.key;
  let button;
  if (BUTTONS.indexOf(key) !== -1) {
    if (key >= 0 && key <= 9) {
      button = findButton(key);
    } else {
      switch (key) {
        case "Delete":
        case "Backspace":
          button = findButton("clear");
          break;
        case "+":
          button = findButton("plus");
          break;
        case "-":
          button = findButton("minus");
          break;
        case "*":
          button = findButton("times");
          break;
        case "/":
          button = findButton("divide");
          break;
        case "Enter":
          button = findButton("equals");
          break;
        case ".":
          button = findButton("decimal");
          break;
      }
    }
  }
  if (button) button.classList.remove("btn-pressed");
};

window.addEventListener("keydown", onKeyDown, true);
window.addEventListener("keyup", onKeyUp, true);
