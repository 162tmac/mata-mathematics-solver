let sidebar = document.querySelector('.side-calculator');
let calculator = document.querySelector('.calculator-container');
let blocker = document.querySelector('.calculator-blocker');

function showSidebar() {
    calculator.classList.add('open');
    sidebar.classList.add('open');
    sidebar.classList.remove('noJS');
    blocker.style.display = "block";
}

function hideSidebar() {
    calculator.classList.remove('open');
    sidebar.classList.remove('open');
    sidebar.classList.add('noJS');
    blocker.style.display = "none";
}
