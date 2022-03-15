const calculatorWindow = document.querySelector(".calculator-window");

// Initializing the window
var windowContent = "0";
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

// Accepting keypresses
window.addEventListener("keydown", onKeyDown, true);

function onKeyDown(e) {
  console.log(e.keyCode);
  if (e.keyCode == 48 || e.keyCode == 96) {
    windowContent = windowContent === "0" ? "0" : windowContent + "0";
  } else if (e.keyCode >= 49 && e.keyCode <= 57) {
    stringValue = String(e.keyCode - 48);
    windowContent =
      windowContent === "0" ? stringValue : windowContent + stringValue;
  } else if (e.keyCode >= 97 && e.keyCode <= 105) {
    stringValue = String(e.keyCode - 96);
    windowContent =
      windowContent === "0" ? stringValue : windowContent + stringValue;
  } else if (e.keyCode == 46 || e.keyCode == 8) {
    windowContent = "0";
  }
  calculatorWindow.textContent = windowContent;
}
