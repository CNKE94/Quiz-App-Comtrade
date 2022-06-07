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

const filterCulture = document.getElementById(`filterCulture`);
const filterHistory = document.getElementById(`filterHistory`);
const filterGeography = document.getElementById(`filterGeography`);

const checkboxFilterC = document.getElementById(`checkboxFilterC`);
const checkboxFilterH = document.getElementById(`checkboxFilterH`);
const checkboxFilterG = document.getElementById(`checkboxFilterG`);

const general_culture = document.getElementById(`general_culture`);
const history1 = document.getElementById(`history`);
const geography = document.getElementById(`geography`);

// Getting data from LocalStorage

let highScoresC = JSON.parse(localStorage.getItem('highScoresC')) || [];
let highScoresH = JSON.parse(localStorage.getItem('highScoresH')) || [];
let highScoresG = JSON.parse(localStorage.getItem('highScoresG')) || [];

// Button for showing highscores

highScoresBtn.addEventListener(`click`, function() {
    wrapper.style.display = 'none';
    highScores.style.display = 'grid';
});

// Button for going back to home page

homePage.addEventListener(`click`, function() {
    wrapper.style.display = 'grid';
    highScores.style.display = 'none';
    location.reload();
});

let counterC = 0;
let counterH = 0;
let counterG = 0;

// Map for each scores which are in localStorage and display them on scores table

highScoresC.map((scores) => {
    counterC++;
    let score = ``;
    score += `<li><strong>${counterC}. ${scores.name}</strong><span>${scores.score} ${scores.convertTime}</span></li>`;
    highScoresListCulture.innerHTML += score;
});

highScoresH.map((scores) => {
    counterH++;
    let score = ``;
    score += `<li><strong>${counterH}. ${scores.name}</strong><span>${scores.score} ${scores.convertTime}</span></li>`;
    highScoresListHistory.innerHTML += score;
});

highScoresG.map((scores) => {
    counterG++;
    let score = ``;
    score += `<li><strong>${counterG}. ${scores.name}</strong><span>${scores.score} ${scores.convertTime}</span></li>`;
    highScoresListGeography.innerHTML += score;
});

let button = false;
const pass = 1010; // password for deleting the scores

// Function for removing popup

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

    checkboxFilterC.classList.remove(`disabledButton`);
    checkboxFilterH.classList.remove(`disabledButton`);
    checkboxFilterG.classList.remove(`disabledButton`);
};

// After click popup is getting fired only if there are any scores in local storage

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

        checkboxFilterC.classList.add(`disabledButton`);
        checkboxFilterH.classList.add(`disabledButton`);
        checkboxFilterG.classList.add(`disabledButton`);
    } else {
        alert(`REZULTATI SU VEĆ PRAZNI`);
    }
});

// Submit password after click on 'Enter'

password.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit.click();
    }
});

// If this checkbox is checked all other checkboxes are set to false

allCheck.addEventListener(`click`, function() {
    cultureCheck.checked = false;
    historyCheck.checked = false;
    geographyCheck.checked = false;
});

// If any of the rest checkboxes are checked then uncheck checkbox allCheck

for (let i = 0; i < quizCheck.length; i++) {
    quizCheck[i].addEventListener(`click`, function() {
        if(quizCheck[i].checked) {
            allCheck.checked = false;
        }
    });
};

// After testing if pass is correct delete certain scores from Local Storage

let patternPass = /^[\d]{4}$/; // check if is a number

submit.addEventListener(`click` , function() {
    if (password.value == ``) {
        incorrectPass.innerHTML = `Prazno polje`;
        password.focus();
    } else {
        if(!patternPass.test(password.value)) {
            incorrectPass.innerHTML = `Neispravan format šifre`;
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
    
                    checkboxFilterC.style.display = 'none';
                    checkboxFilterH.style.display = 'none';
                    checkboxFilterG.style.display = 'none';
            
                    removePopup();
                }
                if (cultureCheck.checked) {
                    if(localStorage.getItem(`highScoresC`) !== null) {
                        localStorage.removeItem(`highScoresC`);
                        highScoresListCulture.innerHTML = ``;
                        checkboxFilterC.style.display = 'none';
        
                        removePopup();
                    } else {
                        incorrectPass.innerHTML = `Skor je već prazan`;
                    }
                }
                if (historyCheck.checked) {
                    if(localStorage.getItem(`highScoresH`) !== null) {
                        localStorage.removeItem(`highScoresH`);
                        highScoresListHistory.innerHTML = ``;
                        checkboxFilterH.style.display = 'none';
        
                        removePopup();
                    } else {
                        incorrectPass.innerHTML = `Skor je već prazan`;
                    }
                }
                if (geographyCheck.checked) {
                    if(localStorage.getItem(`highScoresG`) !== null) {
                        localStorage.removeItem(`highScoresG`);
                        highScoresListGeography.innerHTML = ``;
                        checkboxFilterG.style.display = 'none';
        
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
    }
});

// Button X to remove popup

closePopup.addEventListener(`click`, function() {
    removePopup();

    incorrectPass.innerHTML = ``;
    password.value = ``;
});

// Password in popup set length to 4 characters

password.addEventListener(`keypress`, function(e) {
    let max_chars = 4;
    if (password.value.length >= max_chars) {
        password.value = password.value.slice(0, e.target.max_chars);
        e.preventDefault();
        return;
    }
});

// If user click outside the popup remove popup

document.addEventListener('mouseup', function(e) {
    if (!popup.contains(e.target)) {
        removePopup();

        incorrectPass.innerHTML = ``;
        password.value = ``;
    }
});

// Filter checkbox for scores above 6

filterCulture.addEventListener(`click`, function() {
    let highOverSeven = highScoresC.filter(checkOverSeven);
    function checkOverSeven (number) {
        return number.score > 6;
    };
    if (filterCulture.checked) {
        highScoresListCulture.innerHTML = ``;
        if(highOverSeven.length == 0) {
            let message = ``;
            message += `<li class="message">Nema rezultata pretrage</li>`;
            highScoresListCulture.innerHTML += message;
        } else {
            let counterC = 0;
            highOverSeven.map((scores) => {
                counterC++;
                let score = ``;
                score += `<li><strong>${counterC}. ${scores.name}</strong><span>${scores.score} ${scores.convertTime}</span></li>`;
                highScoresListCulture.innerHTML += score;
            });
        }
    } else {
        highScoresListCulture.innerHTML = ``;
        let counterC = 0;
        highScoresC.map((scores) => {
            counterC++;
            let score = ``;
            score += `<li><strong>${counterC}. ${scores.name}</strong><span>${scores.score} ${scores.convertTime}</span></li>`;
            highScoresListCulture.innerHTML += score;
        });
    }
});

filterHistory.addEventListener(`click`, function() {
    let highOverSeven = highScoresH.filter(checkOverSeven);
    function checkOverSeven (number) {
        return number.score > 6;
    };
    if (filterHistory.checked) {
        highScoresListHistory.innerHTML = ``;
        if(highOverSeven.length == 0) {
            let message = ``;
            message += `<li class="message">Nema rezultata pretrage</li>`;
            highScoresListHistory.innerHTML += message;
        } else {
            let counterH = 0;
            highOverSeven.map((scores) => {
                counterH++;
                let score = ``;
                score += `<li><strong>${counterH}. ${scores.name}</strong><span>${scores.score} ${scores.convertTime}</span></li>`;
                highScoresListHistory.innerHTML += score;
            });
        }
    } else {
        highScoresListHistory.innerHTML = ``;
        let counterH = 0;
        highScoresH.map((scores) => {
            counterH++;
            let score = ``;
            score += `<li><strong>${counterH}. ${scores.name}</strong><span>${scores.score} ${scores.convertTime}</span></li>`;
            highScoresListHistory.innerHTML += score;
        });
    }
});

filterGeography.addEventListener(`click`, function() {
    let highOverSeven = highScoresG.filter(checkOverSeven);
    function checkOverSeven (number) {
        return number.score > 6;
    };
    if (filterGeography.checked) {
        highScoresListGeography.innerHTML = ``;
        if(highOverSeven.length == 0) {
            let message = ``;
            message += `<li class="message">Nema rezultata pretrage</li>`;
            highScoresListGeography.innerHTML += message;
        } else {
            let counterG = 0;
            highOverSeven.map((scores) => {
                counterG++;
                let score = ``;
                score += `<li><strong>${counterG}. ${scores.name}</strong><span>${scores.score} ${scores.convertTime}</span></li>`;
                highScoresListGeography.innerHTML += score;
            });
        }
    } else {
        highScoresListGeography.innerHTML = ``;
        let counterG = 0;
        highScoresG.map((scores) => {
            counterG++;
            let score = ``;
            score += `<li><strong>${counterG}. ${scores.name}</strong><span>${scores.score} ${scores.convertTime}</span></li>`;
            highScoresListGeography.innerHTML += score;
        });
    }
});

// Checkbox filter set to display none if there is no scores for each field

if(localStorage.getItem(`highScoresC`) == null) {
    checkboxFilterC.style.display = 'none';
};

if(localStorage.getItem(`highScoresH`) == null) {
    checkboxFilterH.style.display = 'none';
};

if(localStorage.getItem(`highScoresG`) == null) {
    checkboxFilterG.style.display = 'none';
};

// Responsive JS

window.addEventListener(`load`, responsive);
window.addEventListener(`resize`, responsive);

function responsive() {
    const width = window.innerWidth;
    if(width < 768) {
        // Home page responsive
        wrapper.style.gridTemplateColumns = `1fr`;
        wrapper.style.gridTemplateRows = `29% 29% 29% 5%`;
        wrapper.style.height = `140vh`;
        wrapper.style.fontSize = `80%`;
        general_culture.style.gridColumn = `span 3`;
        history1.style.gridColumn = `span 3`;
        geography.style.gridColumn = `span 3`;
        
    } else {
        // Home page responsive
        wrapper.style.gridTemplateColumns = ``;
        wrapper.style.gridTemplateRows = ``;
        wrapper.style.height = ``;
        wrapper.style.fontSize = ``;
        general_culture.style.gridColumn = ``;
        history1.style.gridColumn = ``;
        geography.style.gridColumn = ``;
    }

    if (width < 700) {
        // High Scores responsive
        highScores.style.gridTemplateColumns = `1fr`;
        highScores.style.gridTemplateRows = `32% 32% 32% 3%`;
        highScores.style.height = `220vh`;

        generalCultureScores.style.gridColumn = `span 3`;
        generalCultureScores.style.borderBottom = `1px solid white`;
        historyScores.style.gridColumn = `span 3`;
        historyScores.style.borderBottom = `1px solid white`;
        geographyScores.style.gridColumn = `span 3`;
        geographyScores.style.borderBottom = `1px solid white`;

        homePage.style.fontSize = '1em';
        deleteScores.style.fontSize = '1em';
    } else {
        // High Scores responsive
        highScores.style.gridTemplateColumns = ``;
        highScores.style.gridTemplateRows = ``;
        highScores.style.height = ``;

        generalCultureScores.style.gridColumn = ``;
        generalCultureScores.style.borderBottom = ``;
        historyScores.style.gridColumn = ``;
        historyScores.style.borderBottom = ``;
        geographyScores.style.gridColumn = ``;
        geographyScores.style.borderBottom = ``;

        homePage.style.fontSize = '';
        deleteScores.style.fontSize = '';
    }
};
