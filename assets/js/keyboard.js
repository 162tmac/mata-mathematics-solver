// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Keyboard Input Functionality

function solverButtonClicked(button) {
    let id = button.id;
    let input = document.querySelector('#solver-form-input');
    let textCursor = input.selectionEnd;
    let textBefore = input.value.slice(0, textCursor);
    let textAfter = input.value.slice(textCursor, input.value.length);
    let mediaQuery = window.matchMedia("screen and (min-width: 900px)");
    switch (id) {
        case "log":
            input.value = `${textBefore}log(  )${textAfter}`;
            textCursor = textCursor+5;
            break;
        case "log-base":
            input.value = `${textBefore}log(  ) base (  )${textAfter}`;
            textCursor =  textCursor+5;
            break;
        case "natural-log":
            input.value = `${textBefore}ln(  )${textAfter}`;
            textCursor =  textCursor+4;
            break;
        case "open-bracket":
            input.value = `${textBefore}(${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "close-bracket":
            input.value = `${textBefore})${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--7":
            input.value = `${textBefore}7${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--8":
            input.value = `${textBefore}8${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--9":
            input.value = `${textBefore}9${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--plus":
            input.value = `${textBefore}+${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "sin":
            input.value = `${textBefore}sin(  )${textAfter}`;
            textCursor =  textCursor+5;
            break;
        case "cos":
            input.value = `${textBefore}cos(  )${textAfter}`;
            textCursor =  textCursor+5;
            break;
        case "tan":
            input.value = `${textBefore}tan(  )${textAfter}`;
            textCursor =  textCursor+5;
            break;
        case "indices":
            input.value = `${textBefore}^(  )${textAfter}`;
            textCursor =  textCursor+3;
            break;
        case "squared":
            input.value = `${textBefore}^2${textAfter}`;
            textCursor =  textCursor+2;
            break;
        case "key--4":
            input.value = `${textBefore}4${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--5":
            input.value = `${textBefore}5${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--6":
            input.value = `${textBefore}6${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--minus":
            input.value = `${textBefore}-${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "integral-limits":
            input.value = `${textBefore}integrate (  ) dx from (  ) to (  )${textAfter}`;
            textCursor =  textCursor+12;
            break;
        case "integral":
            input.value = `${textBefore}integrate (  ) dx${textAfter}`;
            textCursor =  textCursor+12;
            break;
        case "differentiate":
            input.value = `${textBefore}derivative of (  )${textAfter}`;
            textCursor =  textCursor+16;
            break;
        case "root":
            input.value = `${textBefore}(  )th root of (  )${textAfter}`;
            textCursor =  textCursor+2;
            break;
        case "square-root":
            input.value = `${textBefore}sqrt(  )${textAfter}`;
            textCursor =  textCursor+6;
            break;
        case "key--1":
            input.value = `${textBefore}1${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--2":
            input.value = `${textBefore}2${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--3":
            input.value = `${textBefore}3${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--multiply":
            input.value = `${textBefore}*${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "limit-infinity":
            input.value = `${textBefore}limit (  ) as n->infinity${textAfter}`;
            textCursor =  textCursor+8;
            break;
        case "limit-positive":
            input.value = `${textBefore}limit (  ) as n->0+${textAfter}`;
            textCursor =  textCursor+8;
            break;
        case "limit-negative":
            input.value = `${textBefore}limit (  ) as n->0-${textAfter}`;
            textCursor =  textCursor+8;
            break;
        case "less-than":
            input.value = `${textBefore}<${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "greater-than":
            input.value = `${textBefore}>${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--0":
            input.value = `${textBefore}0${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--decimal":
            input.value = `${textBefore}.${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--backspace":
            if (input.value !== "") {
                input.value = input.value.slice(0, -1);
                textCursor =  textCursor-1;
            }
            break;
        case "key--divide":
            input.value = `${textBefore}/${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "infinity":
            input.value = `${textBefore}infinity${textAfter}`;
            textCursor =  textCursor+8;
            break;
        case "pi":
            input.value = `${textBefore}pi${textAfter}`;
            textCursor =  textCursor+2;
            break;
        case "theta":
            input.value = `${textBefore}theta${textAfter}`;
            textCursor =  textCursor+5;
            break;
        case "less-than-equal":
            input.value = `${textBefore}<=${textAfter}`;
            textCursor =  textCursor+2;
            break;
        case "greater-than-equal":
            input.value = `${textBefore}>=${textAfter}`;
            textCursor =  textCursor+2;
            break;
        case "key--clear":
            input.value = "";
            break;
        case "key--equals":
            document.querySelector("#solver-form-submit").click();
            break;
        case "key--x":
            input.value = `${textBefore}x${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--y":
            input.value = `${textBefore}y${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--n":
            input.value = `${textBefore}n${textAfter}`;
            textCursor =  textCursor+1;
            break;
        case "key--e":
            input.value = `${textBefore}e${textAfter}`;
            textCursor =  textCursor+1;      
            break;
        default:
            break;
    }
    input.focus();
    input.setSelectionRange(textCursor, textCursor);
    
    return;
}

let solverButtons = document.querySelectorAll("#keyboard-buttons > button");

solverButtons.forEach(button => {
    button.addEventListener('click', () => {
        solverButtonClicked(button);
    })
});
