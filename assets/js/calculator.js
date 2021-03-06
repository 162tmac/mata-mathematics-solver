let sidebar = document.querySelector('.side-calculator');
let calculatorContainer = document.querySelector('.calculator-container');
// Blocker used to close the sidebar when it's clicked. Will grey the rest of the page
let blocker = document.querySelector('.calculator-blocker');

function showSidebar() {
    sidebar.classList.remove('closed');

    let mediaQuery = window.matchMedia("screen and (min-width: 900px)");
    if (mediaQuery.matches) {
        sidebar.classList.add('open');
        calculatorContainer.classList.add('open');
    } else {
        sidebar.classList.add('sm-open');
        calculatorContainer.classList.add('sm-open');
    }

    blocker.style.display = "block";
}

function hideSidebar() {
    sidebar.classList.add('closed');

    let mediaQuery = window.matchMedia("screen and (min-width: 900px)");
    if (mediaQuery.matches) {
        sidebar.classList.remove('open');
        calculatorContainer.classList.remove('open');
    } else {
        sidebar.classList.remove('sm-open');
        calculatorContainer.classList.remove('sm-open');
    }
    
    blocker.style.display = "none";
}

const operatorButtons = document.querySelectorAll('.key--operator');
const numberButtons = document.querySelectorAll('.key--number');
const backspaceButton = document.querySelector('.key--backspace');
const clearButton = document.querySelector('.key--clear');
const equalsButton = document.querySelector('.key--equals');
let currentDisplay = document.querySelector('#display-current');
let previousDisplay = document.querySelector('#display-previous');

// Functions for calculator

// Takes a number, converts it to a string and 
function numberToDisplay(number) {
    number = number.toString();
    // For inputting negative number
    if (number === "-") {
        return number;
    }
    let wholeNums = parseFloat(number.split('.')[0]);
    let decimalNums = number.split('.')[1];
    let formatted;
    if (isNaN(wholeNums)) {
        formatted = "0";
    } else {
        formatted = wholeNums.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalNums != null) {
        return formatted + '.' + decimalNums;
    } else {
        return formatted;
    }
}

// Converts string from display to number
function displayToNumber(displayNumber) {
    let number = displayNumber.replaceAll(',', "");
    return number;
}

function addNumToDisplay(number) {
    if (currentDisplay.innerHTML === "&nbsp;") {
        currentDisplay.innerHTML = "";
    }
    if (currentDisplay.innerHTML.includes(".") && number === ".") return;
    let current = displayToNumber(currentDisplay.innerHTML);
    current = current.toString() + number.toString();
    currentDisplay.innerHTML = numberToDisplay(current);
}

function compute(previous, current, operator) {
    let result;
    previous = displayToNumber(previous);
    current = displayToNumber(current);
    switch(operator) {
        case "+":
            result = parseFloat(previous) + parseFloat(current);
            break;
        case "-":
            result = parseFloat(previous) - parseFloat(current);
            break;
        case "×":
            result = parseFloat(previous) * parseFloat(current);
            break;
        case "÷":
            if (current === "0") {
                return NaN;
            } else {
                result = parseFloat(previous) / parseFloat(current);
            }
            break;
        default:
            return;
    }
    return numberToDisplay(result);
}

// Event Listeners for calculator clicks

numberButtons.forEach(number => {
    number.addEventListener('click', () => {
        if (currentDisplay.innerHTML === "NaN") {
            currentDisplay.innerHTML = "&nbsp;";
        }
        addNumToDisplay(number.innerHTML);
    });
});

operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {
        if (operator.innerHTML === "-" && currentDisplay.innerHTML === "&nbsp;") {
            addNumToDisplay("-");
        } else if (currentDisplay.innerHTML === "NaN" || currentDisplay.innerHTML === "&nbsp;") {
            currentDisplay.innerHTML = "&nbsp;";
        } else if (["+", "-", "×", "÷"].includes(previousDisplay.innerHTML.slice(-1))) {
            let result = compute(previousDisplay.innerHTML.slice(0, -2), currentDisplay.innerHTML, previousDisplay.innerHTML.slice(-1));
            previousDisplay.innerHTML = `${result} ${operator.innerHTML}`;
            currentDisplay.innerHTML = "&nbsp;";
        } else {
            previousDisplay.innerHTML = `${currentDisplay.innerHTML} ${operator.innerHTML}`;
            currentDisplay.innerHTML = "&nbsp;";
        }
    });
});

equalsButton.addEventListener('click', () => {
    if (["+", "-", "×", "÷"].includes(previousDisplay.innerHTML.slice(-1))) {
        let result = compute(previousDisplay.innerHTML.slice(0, -2), currentDisplay.innerHTML, previousDisplay.innerHTML.slice(-1));
        previousDisplay.innerHTML = "&nbsp;";
        currentDisplay.innerHTML = `${result}`;
    } else {
        previousDisplay.innerHTML = currentDisplay.innerHTML;
        currentDisplay.innerHTML = "&nbsp;";
    }
});

clearButton.addEventListener('click', ()=>{
    previousDisplay.innerHTML = "&nbsp;";
    currentDisplay.innerHTML = "&nbsp;";
});

backspaceButton.addEventListener('click', ()=>{
    currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -1);
    if (currentDisplay.innerHTML === "") {
        currentDisplay.innerHTML = "&nbsp;";
    }
});
