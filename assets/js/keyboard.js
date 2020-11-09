// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Solver Input Dropdown Functionality

function dropdownChanged(value) {
    let input = document.querySelector('#solver-form-input');
    let textCursor = input.selectionEnd;
    let textBefore = input.value.slice(0, textCursor);
    let textAfter = input.value.slice(textCursor, input.value.length);
    console.log(value);
    switch (value) {
        case "calculate":
            input.value = `Calculate ${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+10, textCursor+10);
            break;
        case "solve":
            input.value = `Solve ${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+6, textCursor+6);
            break;
        case "simplify":
            input.value = `Simplify ${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+9, textCursor+9);
            break;
        case "factorise":
            input.value = `Factorise ${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+10, textCursor+10);
            break;
        case "expand":
            input.value = `Expand ${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+7, textCursor+7);
            break;
        case "gcd":
            input.value = `GCD: ${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+5, textCursor+5);
            break;
        case "complete-square":
            input.value = `Complete the square: ${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+21, textCursor+21);
            break;
        case "simultaneous-equations":
            input.value = `Solve:  , ${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+7, textCursor+7);
            break;
        case "sequence-equation":
            input.value = `Find sequence of:  , , , , ...${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+19, textCursor+19);
            break;
        case "devirative":
            input.value = `Derivative of ${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+14, textCursor+14);
            break;
        case "second-devirative":
            input.value = `Second derivative of ${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+21, textCursor+21);
            break;
        case "integral":
            input.value = `Integrate (  ) dx${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+12, textCursor+12);
            break;
        case "definite-integral":
            input.value = `Integrate (  ) dx from (  ) to (  )${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+12, textCursor+12);
            break;
        case "local-max":
            input.value = `Maximize ${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+9, textCursor+9);
            break;
        case "local-min":
            input.value = `Minimize ${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+9, textCursor+9);
            break;
        case "limit":
            input.value = `Limit (  ) as n -> (  )${input.value}`;
            input.focus();
            input.setSelectionRange(textCursor+8, textCursor+8);
            break;
        default:
            break;
    return
    }
}

let dropdown = document.querySelector('#methods-selector');
console.log(dropdown);
dropdown.addEventListener ('change', ()=>{
    dropdownChanged(dropdown.value);
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Keyboard Input Functionality

function solverButtonClicked(button) {
    let id = button.id;
    let input = document.querySelector('#solver-form-input');
    let textCursor = input.selectionEnd;
    let textBefore = input.value.slice(0, textCursor);
    let textAfter = input.value.slice(textCursor, input.value.length);
    console.log(input, textCursor);
    switch (id) {
        case "log":
            input.value = `${textBefore}log(  )${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+5, textCursor+5);
            break;
        case "log-base":
            input.value = `${textBefore}log(  ) base (  )${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+5, textCursor+5);
            break;
        case "natural-log":
            input.value = `${textBefore}ln(  )${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+4, textCursor+4);
            break;
        case "open-bracket":
            input.value = `${textBefore}(${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "close-bracket":
            input.value = `${textBefore})${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "key--7":
            input.value = `${textBefore}7${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "key--8":
            input.value = `${textBefore}8${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "key--9":
            input.value = `${textBefore}9${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "key--plus":
            input.value = `${textBefore}+${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "sin":
            input.value = `${textBefore}sin(  )${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+5, textCursor+5);
            break;
        case "cos":
            input.value = `${textBefore}cos(  )${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+5, textCursor+5);
            break;
        case "tan":
            input.value = `${textBefore}tan(  )${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+5, textCursor+5);
            break;
        case "indices":
            input.value = `${textBefore}^(  )${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+3, textCursor+3);
            break;
        case "squared":
            input.value = `${textBefore}^2${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+2, textCursor+2);
            break;
        case "key--4":
            input.value = `${textBefore}4${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "key--5":
            input.value = `${textBefore}5${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "key--6":
            input.value = `${textBefore}6${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "key--minus":
            input.value = `${textBefore}-${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "integral-limits":
            input.value = `${textBefore}integrate (  ) dx from (  ) to (  )${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+12, textCursor+12);
            break;
        case "integral":
            input.value = `${textBefore}integrate (  ) dx${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+12, textCursor+12);
            break;
        case "differentiate":
            input.value = `${textBefore}derivative of ${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+14, textCursor+14);
            break;
        case "root":
            input.value = `${textBefore}(  )th root of (  )${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+2, textCursor+2);
            break;
        case "sqaure-root":
            input.value = `${textBefore}sqrt(  )${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+6, textCursor+6);
            break;
        case "key--1":
            input.value = `${textBefore}1${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "key--2":
            input.value = `${textBefore}2${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "key--3":
            input.value = `${textBefore}3${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "key--multiply":
            input.value = `${textBefore}*${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "limit-infinity":
            input.value = `${textBefore}limit (  ) as n->infinity${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+8, textCursor+8);
            break;
        case "limit-positive":
            input.value = `${textBefore}limit (  ) as n->0+${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+8, textCursor+8);
            break;
        case "limit-negative":
            input.value = `${textBefore}limit (  ) as n->0-${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+8, textCursor+8);
            break;
        case "less-than":
            input.value = `${textBefore}<${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "greater-than":
            input.value = `${textBefore}>${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "key--0":
            input.value = `${textBefore}0${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "key--decimal":
            input.value = `${textBefore}.${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "key--backspace":
            if (input.value !== "") {
                input.value = input.value.slice(0, -1);
                input.focus();
                input.setSelectionRange(textCursor-1, textCursor-1);
            }
            break;
        case "key--divide":
            input.value = `${textBefore}/${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+1, textCursor+1);
            break;
        case "infinity":
            input.value = `${textBefore}infinity${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+8, textCursor+8);
            break;
        case "pi":
            input.value = `${textBefore}pi${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+2, textCursor+2);
            break;
        case "theta":
            input.value = `${textBefore}theta${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+5, textCursor+5);
            break;
            break;
        case "less-than-equal":
            input.value = `${textBefore}<=${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+2, textCursor+2);
            break;
        case "greater-than-equal":
            input.value = `${textBefore}>=${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+2, textCursor+2);
            break;
        case "key--clear":
            input.value = "";
            input.focus();
            break;
        case "key--equals":
            document.querySelector("#solver-form-submit").click();
            break;
        default:
            break;
    }
    return;
}

let solverButtons = document.querySelectorAll("#keyboard-buttons > button");

solverButtons.forEach(button => {
    button.addEventListener('click', () => {
        solverButtonClicked(button);
    })
});
