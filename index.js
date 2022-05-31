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

const allCheck = document.getElementById(`allCheck`);
const cultureCheck = document.getElementById(`cultureCheck`);
const historyCheck = document.getElementById(`historyCheck`);
const geographyCheck = document.getElementById(`geographyCheck`);
const quizCheck = document.getElementsByClassName(`quizCheck`);

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

function removePopup() {
    popup.style.display = 'none';

    button = false;
    homePage.disabled = button;
    deleteScores.disabled = button;
    homePage.classList.remove("disabledButton");
    deleteScores.classList.remove("disabledButton");

    generalCultureScores.classList.remove("blur");
    historyScores.classList.remove("blur");
    geographyScores.classList.remove("blur");
    buttons.classList.remove("blur");
};

deleteScores.addEventListener(`click`, function() {
    if (localStorage.length > 0) {
        button = true;
        homePage.disabled = button;
        deleteScores.disabled = button;
        homePage.classList.add("disabledButton");
        deleteScores.classList.add("disabledButton");

        popup.style.display = 'flex';
        generalCultureScores.classList.add("blur");
        historyScores.classList.add("blur");
        geographyScores.classList.add("blur");
        buttons.classList.add("blur");

        password.focus();

        allCheck.checked = false;
        cultureCheck.checked = false;
        historyCheck.checked = false;
        geographyCheck.checked = false;
    } else {
        alert(`REZULTATI SU VEĆ PRAZNI`);
    }
});

password.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit.click();
    }
});

allCheck.addEventListener(`click`, function() {
    cultureCheck.checked = false;
    historyCheck.checked = false;
    geographyCheck.checked = false;
});

for (let i = 0; i < quizCheck.length; i++) {
    quizCheck[i].addEventListener(`click`, function() {
        if(quizCheck[i].checked) {
            allCheck.checked = false;
        }
    });
};

submit.addEventListener(`click` , function() {
    if (password.value == ``) {
        incorrectPass.innerHTML = `Prazno polje`;
        password.focus();
    } else {
        if(password.value == pass) {
            if(!allCheck.checked && !cultureCheck.checked && !historyCheck.checked && !geographyCheck.checked) {
                incorrectPass.innerHTML = `Nije ništa čekirano`;
            }
            if(allCheck.checked) {
                localStorage.clear();
                highScoresListCulture.innerHTML = ``;
                highScoresListHistory.innerHTML = ``;
                highScoresListGeography.innerHTML = ``;
        
                removePopup();
            }
            if (cultureCheck.checked) {
                if(localStorage.getItem(`highScoresC`) !== null) {
                    localStorage.removeItem(`highScoresC`);
                    highScoresListCulture.innerHTML = ``;
    
                    removePopup();
                } else {
                    incorrectPass.innerHTML = `Skor je već prazan`;
                }
            }
            if (historyCheck.checked) {
                if(localStorage.getItem(`highScoresH`) !== null) {
                    localStorage.removeItem(`highScoresH`);
                    highScoresListHistory.innerHTML = ``;
    
                    removePopup();
                } else {
                    incorrectPass.innerHTML = `Skor je već prazan`;
                }
            }
            if (geographyCheck.checked) {
                if(localStorage.getItem(`highScoresG`) !== null) {
                    localStorage.removeItem(`highScoresG`);
                    highScoresListGeography.innerHTML = ``;
    
                    removePopup();
                } else {
                    incorrectPass.innerHTML = `Skor je već prazan`;
                }
            }
        } else {
            incorrectPass.innerHTML = `Netačna šifra`;
            password.focus();
        }
    }
});

closePopup.addEventListener(`click`, function() {
    removePopup();

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

document.addEventListener('mouseup', function(e) {
    if (!popup.contains(e.target)) {
        removePopup();

        incorrectPass.innerHTML = ``;
        password.value = ``;
    }
});
