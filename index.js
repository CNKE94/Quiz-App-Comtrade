const highScoresBtn = document.getElementById(`highScoresBtn`);
const wrapper = document.getElementById(`wrapper`);
const highScores = document.getElementById(`highScores`);
const homePage = document.getElementById(`homePage`);

const highScoresListCulture = document.getElementById(`highScoresListCulture`);
const highScoresListHistory = document.getElementById(`highScoresListHistory`);
const highScoresListGeography = document.getElementById(`highScoresListGeography`);

const generalCultureScores = document.getElementById(`generalCultureScores`);
const historyScores = document.getElementById(`historyScores`);
const geographyScores = document.getElementById(`geographyScores`);
const buttons = document.getElementById(`buttons`);

const deleteScores = document.getElementById(`deleteScores`);
const popup = document.getElementById(`popup`);
const closePopup = document.getElementById(`closePopup`);
const password = document.getElementById(`password`);
const submit = document.getElementById(`submit`);
const incorrectPass = document.getElementById(`incorrectPass`);

let highScoresC = JSON.parse(localStorage.getItem('highScoresC')) || [];
let highScoresH = JSON.parse(localStorage.getItem('highScoresH')) || [];
let highScoresG = JSON.parse(localStorage.getItem('highScoresG')) || [];

highScoresBtn.addEventListener(`click`, function() {
    wrapper.style.display = 'none';
    highScores.style.display = 'grid';
});

homePage.addEventListener(`click`, function() {
    wrapper.style.display = 'grid';
    highScores.style.display = 'none';
});

let counterC = 0;
let counterH = 0;
let counterG = 0;

highScoresC.map((scores) => {
    counterC++
    let score = ``;
    score += `<li><strong>${counterC}. ${scores.name}</strong><span>${scores.score} ${scores.convertTime}</span></li>`;
    highScoresListCulture.innerHTML += score;
});

highScoresH.map((scores) => {
    counterH++
    let score = ``;
    score += `<li><strong>${counterH}. ${scores.name}</strong><span>${scores.score} ${scores.convertTime}</span></li>`;
    highScoresListHistory.innerHTML += score;
});

highScoresG.map((scores) => {
    counterG++
    let score = ``;
    score += `<li><strong>${counterG}. ${scores.name}</strong><span>${scores.score} ${scores.convertTime}</span></li>`;
    highScoresListGeography.innerHTML += score;
});

let button = false;
const pass = 1010;

deleteScores.addEventListener(`click`, function() {
    if (localStorage.length > 0) {
        button = true;
        homePage.disabled = button;
        deleteScores.disabled = button;
        popup.style.display = 'flex';
        generalCultureScores.classList.add("blur");
        historyScores.classList.add("blur");
        geographyScores.classList.add("blur");
        buttons.classList.add("blur");
    } else {
        alert(`REZULTATI SU VEĆ PRAZNI`);
    }
});

submit.addEventListener(`click` , function() {
    if (password.value == ``) {
        incorrectPass.innerHTML = `Prazno polje`;
    } else {
        if(password.value == pass) {
            localStorage.clear();
            highScoresListCulture.innerHTML = ``;
            highScoresListHistory.innerHTML = ``;
            highScoresListGeography.innerHTML = ``;
    
            popup.style.display = 'none';
    
            button = false;
            homePage.disabled = button;
            deleteScores.disabled = button;
    
            generalCultureScores.classList.remove("blur");
            historyScores.classList.remove("blur");
            geographyScores.classList.remove("blur");
            buttons.classList.remove("blur");
        } else {
            incorrectPass.innerHTML = `Netačna šifra`;
        }
    }
});

closePopup.addEventListener(`click`, function() {
    popup.style.display = 'none';
    button = false;
    homePage.disabled = button;
    deleteScores.disabled = button;

    generalCultureScores.classList.remove("blur");
    historyScores.classList.remove("blur");
    geographyScores.classList.remove("blur");
    buttons.classList.remove("blur");

    incorrectPass.innerHTML = ``;
    password.value = ``;
});

password.addEventListener(`keypress`, function(e) {
    let max_chars = 4;
    if (password.value.length >= max_chars) {
        password.value = password.value.slice(0, e.target.max_chars);
        e.preventDefault();
        return;
    }
});
