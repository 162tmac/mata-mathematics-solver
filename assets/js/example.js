function copyExample(example) {
    console.log(example);
    let exampleText = example.querySelector(".example-text").innerHTML;
    let textArea = document.createElement("textarea");
    textArea.value = exampleText.replaceAll("&gt;", ">");
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}