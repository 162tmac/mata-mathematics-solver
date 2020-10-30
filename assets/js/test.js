document.querySelector('#solver-form').addEventListener("submit", e => {
    e.preventDefault();
    document.querySelector('.solver-results').innerHTML = "";

    let baseURL = "https://api.wolframalpha.com/v2/query";
    let appID = "HGP984-WK53RHXL47";
    let query = document.querySelector('#solver-form-input').value;
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
    console.log(data.queryresult.pods);
    let pods = data.queryresult.pods;
    let solution = [];

    pods.forEach(pod => {
        let subpods = pod.subpods;
        subpods.forEach(subpod => {
            if (subpod.title === "Possible intermediate steps") {
                solution.push(subpod);
            }
        })
    })
    console.log(solution);
    if (solution.length == 0) {
        pods.forEach(pod => {
            let subpods = pod.subpods;
            subpods.forEach(subpod => {
                if ((pod.title === "Results") || (pod.title === "Result")) {
                    solution.push(subpod);
                }
            })
        })
    }
    console.log(solution);
    let firstPod = pods[0];
    let firstSubpods = firstPod.subpods;
    console.log(firstSubpods);

    // firstSubpods.forEach(subpod => {
    //     document.querySelector('.solver-results').innerHTML += `<img src=${subpod.img.src}>`;
    // })
    
    // solution.forEach(sol => {
    //     let imageStepsSource = sol.img.src;
    //     let imageStepsHTML = `<br><img src=${imageStepsSource}>`
    //     let steps = sol.plaintext;
    //     let stepsMath = sol.mathml;
        
    //     console.log(steps);
    //     steps = steps.replaceAll(/\n/g, '<br>');
    //     steps = steps.replaceAll('integral', '&int;');
    //     stepsMath = stepsMath.replaceAll(' </mtext>', '&nbsp</mtext>');
    //     stepsMath = stepsMath.replaceAll('</mn>', '&nbsp</mn>');
    //     stepsMath = stepsMath.replaceAll('<mi>integral</mi>', '<mi>&int;</mi>');

    //     console.log(stepsMath);
    //     document.querySelector('.solver-results').innerHTML += stepsMath;
    //     document.querySelector('.solver-results').innerHTML += `<p>${steps}</p>`;
    //     document.querySelector('.solver-results').innerHTML += imageStepsHTML;
    //     MathJax.typeset();
    // })
    let imageStepsSource = solution[0].img.src;
    let imageStepsHTML = `<br><img src=${imageStepsSource}>`
    let steps = solution[0].plaintext;
    let stepsMath = solution[0].mathml;
    
    console.log(steps);
    steps = steps.replaceAll(/\n/g, '<br>');
    steps = steps.replaceAll('integral', '&int;');
    stepsMath = stepsMath.replaceAll(' </mtext>', '&nbsp</mtext>');
    stepsMath = stepsMath.replaceAll('</mn>', '&nbsp</mn>');
    stepsMath = stepsMath.replaceAll('<mi>integral</mi>', '<mi>&int;</mi>');
    stepsMath = stepsMath.replaceAll('<mi>integral</mi>', '<mi>&int;</mi>');

    console.log(stepsMath);
    document.querySelector('.solver-results').innerHTML += stepsMath;
    document.querySelector('.solver-results').innerHTML += `<p>${steps}</p>`;
    document.querySelector('.solver-results').innerHTML += imageStepsHTML;
    MathJax.typeset();

    let rows = Array.from(document.querySelectorAll('mjx-math > mjx-mtable > mjx-table > mjx-itable > mjx-mtr'));
    console.log(rows);
    let i;
    let stepsObject = {};
    for (i = 0; i < rows.length - 1; i++) {
        rows[i].classList.add(`step${i+1}`);
    }
    rows[rows.length - 1].classList.add(`answer`);
    console.log(stepsObject);
});
