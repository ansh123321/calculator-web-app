// 🔹 Track if last action was calculation
let justCalculated = false;

// 🔹 Append value to display
function appendValue(value) {
    let display = document.getElementById("display");

    if (justCalculated) {
        display.value = "";
        justCalculated = false;
    }

    let lastChar = display.value.slice(-1);
    let operators = ["+", "-", "*", "/"];

    // Prevent double operators (like ++, --)
    if (operators.includes(lastChar) && operators.includes(value)) {
        return;
    }

    // Replace 0
    if (display.value === "0") {
        display.value = value;
    } else {
        display.value += value;
    }

    scrollToEnd();
}

// 🔹 Clear display
function clearDisplay() {
    let display = document.getElementById("display");
    display.value = "0";
    scrollToEnd();
}

// 🔹 Delete last character
function deleteLast() {
    let display = document.getElementById("display");
    let current = display.value.slice(0, -1);

    display.value = current || "0";

    scrollToEnd();
}

// 🔹 Calculate result (safe eval alternative)
function calculate() {
    let display = document.getElementById("display");

    try {
        let expression = display.value;

        let result = Function('"use strict"; return (' + expression + ')')();

        display.value = result;

        addToHistory(expression, result);

        justCalculated = true;

        scrollToEnd();
    } catch {
        display.value = "Error";
    }
}

// 🔹 Add to history
function addToHistory(expression, result) {
    let historyDiv = document.getElementById("history");

    let item = document.createElement("div");
    item.innerText = expression + " = " + result;

    historyDiv.prepend(item);
}

// 🔹 Toggle history panel
function toggleHistory() {
    let history = document.getElementById("history");

    if (history.style.display === "none" || history.style.display === "") {
        history.style.display = "block";
    } else {
        history.style.display = "none";
    }
}

// 🔹 Scroll display to latest input
function scrollToEnd() {
    let display = document.getElementById("display");
    display.scrollLeft = display.scrollWidth;
}

// 🔹 Keyboard support
document.addEventListener("keydown", function(e) {
    let key = e.key;

    // Numbers
    if (!isNaN(key)) {
        appendValue(key);
    }

    // Operators
    else if (key === "+" || key === "-" || key === "*" || key === "/") {
        appendValue(key);
    }

    // Decimal
    else if (key === ".") {
        appendValue(".");
    }

    // Enter → Calculate
    else if (key === "Enter") {
        calculate();
    }

    // Backspace → Delete
    else if (key === "Backspace") {
        deleteLast();
    }

    // Escape → Clear
    else if (key === "Escape") {
        clearDisplay();
    }
});