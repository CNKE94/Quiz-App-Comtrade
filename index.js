const highScoresBtn = document.getElementById(`highScoresBtn`);
const wrapper = document.getElementById(`wrapper`);
const highScores = document.getElementById(`highScores`);
const homePage = document.getElementById(`homePage`);

const highScoresListCulture = document.getElementById(`highScoresListCulture`);
const highScoresListHistory = document.getElementById(`highScoresListHistory`);
const highScoresListGeography = document.getElementById(`highScoresListGeography`);

let highScoresC = JSON.parse(localStorage.getItem('highScoresC')) || [];
let highScoresH = JSON.parse(localStorage.getItem('highScoresH')) || [];
let highScoresG = JSON.parse(localStorage.getItem('highScoresG')) || [];
console.log(highScoresG);

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
