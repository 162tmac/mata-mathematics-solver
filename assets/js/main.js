document.querySelector('#solver-form').addEventListener("submit", e => {
    e.preventDefault();

    document.querySelector('.reveal-buttons').innerHTML = "";
    document.querySelector('.solver-results').innerHTML = "";

    let baseURL = "https://api.wolframalpha.com/v2/query";
    let appID = "HGP984-WK53RHXL47";
    let query = document.querySelector('#solver-form-input').value;
    debugger;
    console.log(query);
    let queryURL = encodeURIComponent(query);
    console.log(queryURL);

    let fullURL = `${baseURL}?appid=${appID}&input=${queryURL}&podstate=Step-by-step%20solution&output=JSON&format=image,plaintext,mathml`

    let xhr = new XMLHttpRequest();
    xhr.open('GET', fullURL, false);
    xhr.send(null);

    // xhr.onload = function () {
    //     if (xhr.readyState === xhr.DONE && xhr.status === 200) {
    //         console.log(xhr.response, xhr.responseXML);
    //     }
    // };
    
    data = JSON.parse(xhr.responseText);
    console.log(data);
    let pods = data.queryresult.pods;
    console.log(pods);
    let solution = [];

    pods.forEach(pod => {
        if (['Result', 'Results', 'Solution', 'Solutions'].includes(pod.title)){
            let subpods = pod.subpods;
            solution.push(subpods);
        }
        
    })
    console.log(solution);
    if (solution.length == 0) {
       solution.push(pods[0].subpods);
    }
    console.log(solution);

    let imageStepsSource;
    let imageStepsHTML;
    let steps;
    let stepsMath;

    if (solution[0].length === 1) {
        imageStepsSource = solution[0][0].img.src;
        imageStepsHTML = `<br><img src=${imageStepsSource}>`
        steps = solution[0][0].plaintext;
        stepsMath = solution[0][0].mathml;
    } else if (solution[0][1].title === "Possible intermediate steps") {
        imageStepsSource = solution[0][1].img.src;
        imageStepsHTML = `<br><img src=${imageStepsSource}>`
        steps = solution[0][1].plaintext;
        stepsMath = solution[0][1].mathml;
    }
    
    console.log(steps);
    steps = steps.replaceAll(/\n/g, '<br>');
    steps = steps.replaceAll('integral', '&int;');
    stepsMath = stepsMath.replaceAll(' </mtext>', '&nbsp</mtext>');
    stepsMath = stepsMath.replaceAll('</mn>', '&nbsp</mn>');
    stepsMath = stepsMath.replaceAll('<mi>integral</mi>', '<mi>&int;</mi>');

    console.log(stepsMath);
    document.querySelector('.solver-results').innerHTML += stepsMath;
    document.querySelector('.solver-results').innerHTML += `<p>${steps}</p>`;
    document.querySelector('.solver-results').innerHTML += imageStepsHTML;
    MathJax.typeset();

    let rows = Array.from(document.querySelectorAll('mjx-math > mjx-mtable > mjx-table > mjx-itable > mjx-mtr'));
    console.log(rows);
    let i;
    let btn;
    
    for (i = 0; i < rows.length - 1; i++) {
        rows[i].id = `step${i+1}`;
        rows[i].classList.add('step');
        document.querySelector(`mjx-mtr#step${i+1} mjx-mtr:nth-child(1)`).classList.add('step-text');
        document.querySelector(`mjx-mtr#step${i+1} mjx-mtr:nth-child(2)`).classList.add('step-equation');

        btn = document.createElement("button");
        btn.innerHTML = `Reveal Step ${i+1}`;
        btn.classList.add('reveal-button');
        console.log(btn);
        document.querySelector(".reveal-buttons").append(btn);

        addClickToButton(btn, `step${i+1}`);
    }
    
    rows[rows.length - 1].id = `answer`;
    rows[rows.length - 1].classList.add('step');
    document.querySelector(`mjx-mtr#answer mjx-mtr:nth-child(1)`).classList.add('step-text');
    document.querySelector(`mjx-mtr#answer mjx-mtr:nth-child(2)`).classList.add('step-equation');

    btn = document.createElement("button");
    btn.innerHTML = `Reveal Answer`;
    btn.classList.add('reveal-button');
    console.log(btn);
    document.querySelector(".reveal-buttons").append(btn);
    addClickToButton(btn, 'answer');

    document.querySelector('.results').scrollIntoView({behavior: "smooth"});
});

function addClickToButton(btn, id) {
    btn.addEventListener('click', ()=>{
        document.querySelector(`#${id}`).style.visibility = "visible";
    })
}

function solverButtonClicked(button) {
    debugger;
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
            input.value = `${textBefore}^2 ${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+3, textCursor+3);
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
            input.value = `${textBefore}infinity ${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+9, textCursor+9);
            break;
        case "pi":
            input.value = `${textBefore}pi ${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+3, textCursor+3);
            break;
        case "theta":
            input.value = `${textBefore}theta ${textAfter}`;
            input.focus();
            input.setSelectionRange(textCursor+6, textCursor+6);
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

let solverButtons = document.querySelectorAll("#math-buttons > button");

solverButtons.forEach(button => {
    button.addEventListener('click', () => {
        solverButtonClicked(button);
    })
})