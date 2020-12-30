document.querySelector('#solver-form').addEventListener("submit", e => {
    e.preventDefault();

    // Clears any previous results on page
    document.querySelector('.reveal-buttons').innerHTML = "";
    document.querySelector('.results-inner').innerHTML = "";

    // Method for sending request to Wolfram API
    let baseURL = "https://cors-anywhere.herokuapp.com/https://api.wolframalpha.com/v2/query";
    // let baseURL = "https://api.wolframalpha.com/v2/query";
    let appID = "HGP984-WK53RHXL47";
    let query = document.querySelector('#solver-form-input').value;
    let queryURL = encodeURIComponent(query);

    let fullURL = `${baseURL}?appid=${appID}&input=${queryURL}&podstate=Step-by-step%20solution&output=JSON&format=image,plaintext,mathml`

    let xhr = new XMLHttpRequest();
    xhr.open('GET', fullURL, false);
    xhr.send(null);
    data = JSON.parse(xhr.responseText);
    let pods = data.queryresult.pods;

    // Will hold the step by step solution of the query. If there is no step byt step solution, 
    // a different pod from the API will be saved in here
    let solution = [];


    // Searches for a pod of the response that would contain a step by step solution
    pods.forEach(pod => {
        if (['Result', 'Results', 'Solution', 'Solutions', 'Exact result', 'Differential equation solutions', 
            'Decimal approximation'].includes(pod.title)) {
            let subpods = pod.subpods;
            solution.push(subpods);
        }
    })


    // If there's no step by step solution with those headings just push the first pod if there's 
    // not a stepby step in the second pod
    if (solution.length == 0) {
        if (pods.length > 1 && pods[0].title === "Input interpretation") {
            let stepByStepExists = false;
            for (let i = 0; i < pods[1].subpods.length; i++) {
                if (pods[1].subpods[i].title === "Possible intermediate steps") {
                    stepByStepExists = true;
                }
            }
            if (stepByStepExists === true) {
                solution.push(pods[1].subpods);
            } else {
                solution.push(pods[0].subpods);
            }
        } else {
            solution.push(pods[0].subpods);
        }
    }

    if (solution.length == 0) {
        solution.push(pods[0].subpods);
    }

    let steps;

    if (solution[0].length === 1) {
        steps = solution[0][0].mathml;
        if (steps === undefined) {
            steps = solution[0][0].plaintext;
        }
    } else {
        let stepByStepExists = false;
        for (let i = 0; i < solution[0].length; i++) {
            if (solution[0][i].title === "Possible intermediate steps") {
                stepByStepExists = true;
                steps = solution[0][i].mathml;
                if (steps.includes("merror")) {
                    steps = solution[0][0].mathml;
                }
            }
        }
        if (stepByStepExists === false) {
            steps = solution[0][0].mathml;
        }
    }

    // Fixes some formatting bugs that were happening when getting the solution in MathML format
    steps = steps.replaceAll(' </mtext>', '&nbsp</mtext>');
    steps = steps.replaceAll('</mn>', '&nbsp</mn>');
    steps = steps.replaceAll('<mi>integral</mi>', '<mi>&int;</mi>');
    steps = steps.replaceAll('<merror>', '<mi>');
    steps = steps.replaceAll('</merror>', '</mi>');

    // Inserts the MathML solution into the html page
    document.querySelector('.results-inner').innerHTML += steps;

    // Reloads Mathjax to read the MathMl inserted into the HTML
    MathJax.typeset();
    // Now will create buttons from the MathJax elements loaded to the page and 
    // add funtionality to reveal a step of the solution
    let rows = Array.from(document.querySelectorAll('mjx-math > mjx-mtable > mjx-table > mjx-itable > mjx-mtr'));
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
        document.querySelector(".reveal-buttons").append(btn);

        if (i != 0) {
            btn.style.visibility = "hidden";
        }

        addClickToButton(btn, `step${i+1}`);
    }

    // If the answer has steps
    if (rows.length > 1) {
        //Make Reveal All Button
        btn = document.createElement("button");
        btn.innerHTML = `Reveal All Steps`;
        btn.id = 'reveal-all-button';
        btn.classList.add('reveal-button');
        document.querySelector(".reveal-buttons").prepend(btn);
        addClickToButton(btn, 'reveal-all');

        // Make Answer Div & Button
        rows[rows.length - 1].id = `answer`;
        rows[rows.length - 1].classList.add('step');
        document.querySelector(`mjx-mtr#answer mjx-mtr:nth-child(1)`).classList.add('step-text');
        document.querySelector(`mjx-mtr#answer mjx-mtr:nth-child(2)`).classList.add('step-equation');

        btn = document.createElement("button");
        btn.innerHTML = "Reveal Answer";
        btn.id = "answer-button";
        btn.classList.add('reveal-button');
        addClickToButton(btn, 'answer');
        document.querySelector(".reveal-buttons").append(btn);
        btn.style.visibility = "hidden";
    } else {
        message = document.createElement("h3");
        message.id = "error-message";
        message.innerHTML = "Sorry, step by step <br>solution could not <br>be found. <br><br> Showing just the result. <br><br>If the result isn't as expected <br>you may need to be more <br>specific in your query."
        document.querySelector(".reveal-buttons").append(message);
    }

    // Display the results and scroll the page down to the div
    document.querySelector('section.results').style.display = "block";
    const navbarBottomY = document.querySelector('nav.navbar').getBoundingClientRect().bottom;
    const bottomKeyboardY = document.querySelector('section.solver-buttons').getBoundingClientRect().bottom;

    if (bottomKeyboardY <= navbarBottomY) {
        window.scroll({
            top: bottomKeyboardY,
            behavior: 'smooth'
        });
    } else {
        window.scroll({
            top: bottomKeyboardY - navbarBottomY,
            behavior: 'smooth'
        });
    }


});

function addClickToButton(btn, id) {
    btn.addEventListener('click', () => {
        if (btn.id === "reveal-all-button") {
            let steps = Array.from(document.querySelectorAll('mjx-math > mjx-mtable > mjx-table > mjx-itable > mjx-mtr'));
            let stepButtons = Array.from(document.querySelectorAll('.reveal-buttons > button'));
            steps.forEach(step => {
                step.style.visibility = "visible";
            })
            stepButtons.forEach(button => {
                button.style.visibility = "visible";
            })
        } else if (btn.id === "answer-button") {
            document.querySelector("#answer").style.visibility = "visible";
        } else {
            btn.nextSibling.style.visibility = "visible";
            document.querySelector(`#${id}`).style.visibility = "visible";
        }
    })
}

function hideBanner() {
    let banner = document.querySelector('#how-to-banner').style.display = "none";
}