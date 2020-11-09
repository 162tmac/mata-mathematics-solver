document.querySelector('#solver-form').addEventListener("submit", e => {
    e.preventDefault();

    document.querySelector('.results').style.display = "block";
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
        if (['Result', 'Results', 'Solution', 'Solutions', 'Local maximum', 'Local minimum'].includes(pod.title)){
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
        if (stepsMath === undefined) {
            stepsMath = steps;
        }
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
    // document.querySelector('.solver-results').innerHTML += `<p>${steps}</p>`;
    // document.querySelector('.solver-results').innerHTML += imageStepsHTML;
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

        if (i != 0) {
            btn.style.visibility = "hidden";
        }

        addClickToButton(btn, `step${i+1}`);
    }
    // Make answer Div & Button
    rows[rows.length - 1].id = `answer`;
    rows[rows.length - 1].classList.add('step');
    document.querySelector(`mjx-mtr#answer mjx-mtr:nth-child(1)`).classList.add('step-text');
    document.querySelector(`mjx-mtr#answer mjx-mtr:nth-child(2)`).classList.add('step-equation');

    btn = document.createElement("button");
    btn.innerHTML = `Reveal Answer`;
    btn.classList.add('reveal-button');
    console.log(btn);
    document.querySelector(".reveal-buttons").append(btn);
    btn.style.visibility = "hidden";
    addClickToButton(btn, 'answer');

    //Make Reveal All Button
    btn = document.createElement("button");
    btn.innerHTML = `Reveal All Steps`;
    btn.id = 'reveal-all-button';
    console.log(btn);
    document.querySelector(".reveal-buttons").prepend(btn);
    addClickToButton(btn, 'reveal-all');
    
    document.querySelector('.results').scrollIntoView({behavior: "smooth"});
});

function addClickToButton(btn, id) {
    btn.addEventListener('click', ()=>{
        if (btn.id === "reveal-all-button") {
            let steps = Array.from(document.querySelectorAll('mjx-math > mjx-mtable > mjx-table > mjx-itable > mjx-mtr'));
            let stepButtons = Array.from(document.querySelectorAll('.reveal-buttons > button'));
            console.log(stepButtons);
            steps.forEach(step=>{
                step.style.visibility = "visible";
            })
            stepButtons.forEach(button=>{
                button.style.visibility = "visible";
            })
        } else {
            btn.nextSibling.style.visibility = "visible";
            document.querySelector(`#${id}`).style.visibility = "visible";
        }
    })
}

