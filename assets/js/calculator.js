let sidebar = document.querySelector('.side-calculator');
let calculatorContainer = document.querySelector('.calculator-container');
let blocker = document.querySelector('.calculator-blocker');

function showSidebar() {
    calculatorContainer .classList.add('open');

    sidebar.classList.add('open');
    sidebar.classList.remove('closed');
    
    blocker.style.display = "block";
}

function hideSidebar() {
    calculatorContainer .classList.remove('open');

    sidebar.classList.remove('open');
    sidebar.classList.add('closed');

    blocker.style.display = "none";
}

const operatorButtons = document.querySelectorAll('.key--operator');
const numberButtons = document.querySelectorAll('.key--number');
const backspaceButton = document.querySelector('.key--backspace');
const clearButton = document.querySelector('.key--clear');
const equalsButton = document.querySelector('.key--equals');
let currentDisplay = document.querySelector('#display-current');
let previousDisplay = document.querySelector('#display-previous');

console.log(operatorButtons, numberButtons, backspaceButton, clearButton, equalsButton, currentDisplay, previousDisplay)

// Functions for calculator

function numberToDisplay(number) {
    number = number.toString();
    if (number === "-") {
        return number;
    }
    let wholeNums = parseFloat(number.split('.')[0]);
    let decimalNums = number.split('.')[1];
    let formatted;
    if (isNaN(wholeNums)) {
        formatted = "&nbsp;";
    } else {
        formatted = wholeNums.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalNums != null) {
        return formatted + '.' + decimalNums;
    } else {
        return formatted;
    }
}

function displayToNumber(displayNumber) {
    console.log(displayNumber);
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
    console.log(currentDisplay.innerHTML);
}

function compute(previous, current, operator) {
    let result;
    previous = displayToNumber(previous);
    current = displayToNumber(current);
    console.log(previous, current, operator);
    switch(operator) {
        case "+":
            result = parseFloat(previous) + parseFloat(current)
            break;
        case "-":
            result = parseFloat(previous) - parseFloat(current)
            break;
        case "×":
            result = parseFloat(previous) * parseFloat(current)
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
        addNumToDisplay(number.innerHTML)
        console.log(number.innerHTML)
    })
})

operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {
        if (operator.innerHTML === "-" && currentDisplay.innerHTML === "&nbsp;") {
            addNumToDisplay("-")
        } else if (currentDisplay.innerHTML === "NaN") {
            currentDisplay.innerHTML = "&nbsp;";
        } else if (currentDisplay.innerHTML === "&nbsp;") {
            currentDisplay.innerHTML = "&nbsp;";
        } else if (["+", "-", "×", "÷"].includes(previousDisplay.innerHTML.slice(-1))) {
            let result = compute(previousDisplay.innerHTML.slice(0, -2), currentDisplay.innerHTML, previousDisplay.innerHTML.slice(-1));
            previousDisplay.innerHTML = `${result} ${operator.innerHTML}`;
            currentDisplay.innerHTML = "&nbsp;";
        } else {
            previousDisplay.innerHTML = `${currentDisplay.innerHTML} ${operator.innerHTML}`;
            currentDisplay.innerHTML = "&nbsp;";
        }
    })
})

equalsButton.addEventListener('click', () => {
    console.log(previousDisplay.innerHTML.slice(-1));
    if (["+", "-", "×", "÷"].includes(previousDisplay.innerHTML.slice(-1))) {
        console.log(previousDisplay.innerHTML.slice(0, -2), currentDisplay.innerHTML, previousDisplay.innerHTML.slice(-1));
        let result = compute(previousDisplay.innerHTML.slice(0, -2), currentDisplay.innerHTML, previousDisplay.innerHTML.slice(-1))
        previousDisplay.innerHTML = "&nbsp;"
        currentDisplay.innerHTML = `${result}`;
    } else {
        previousDisplay.innerHTML = currentDisplay.innerHTML;
        currentDisplay.innerHTML = "&nbsp;";
    }
})

clearButton.addEventListener('click', ()=>{
    previousDisplay.innerHTML = "&nbsp;";
    currentDisplay.innerHTML = "&nbsp;";
})

backspaceButton.addEventListener('click', ()=>{
    currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -1);
    if (currentDisplay.innerHTML === "") {
        currentDisplay.innerHTML = "&nbsp;";
    }
})
