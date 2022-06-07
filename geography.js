let start = document.querySelector("#start");

let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");

let choice_que = document.querySelectorAll(".choice_que");
let trophy = document.getElementById("trophy");
let result_message = document.getElementById("result_message");

let username = document.getElementById('username');
let saveScore = document.getElementById('saveName');
let inputCheck = document.getElementById(`inputCheck`);

let finishTime = 0;

function sumTime(time) {
    var minutes = Math.floor((time/1000/60));
    var seconds = Math.floor((time/1000) % 60);
    return `${minutes < 10 ? ("0" + minutes) : minutes}:${seconds < 10 ? ("0" + seconds) : seconds}`;
}

function podaciJson() {
    let xHr = new XMLHttpRequest();
    let random = Math.ceil(Math.random() * 3);

    xHr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let question = JSON.parse(this.responseText);
        // console.log(question);

        let currentQuiz = 0;
        let correct = 0;
        let timer = 0;
        let interval = 0;

        let elementClicked = false;

        start.addEventListener("click", () => {
            start.style.display = "none";
            guide.style.display = "block";
        });
        
        exit.addEventListener("click", () => {
            window.location.href='/index.html';
        });

        let countDown = () => {
            if (timer === 15) {
                elementClicked = true;
                clearInterval(interval);
                next_question.click();
                finishTime += 15;
            } else {
                timer++;
                time.innerText = timer;
            }
        }

        function loadData(answer, answer1) {
            let currentQuizData = question[currentQuiz];
            questionNo.textContent = currentQuizData.questionNum + '.';
            questionText.textContent = currentQuizData.question;

            if(answer === undefined) {
                answer = "";
            }

            if(answer1 === undefined) {
                answer1 = "";
            }

            let niz = [option1, option2, option3, option4];

            option1.innerHTML = `${currentQuizData.a} ${niz.indexOf(niz[0]) === question[currentQuiz].correct ? answer : answer1}`;
            option2.innerHTML = `${currentQuizData.b} ${niz.indexOf(niz[1]) === question[currentQuiz].correct ? answer : answer1}`;
            option3.innerHTML = `${currentQuizData.c} ${niz.indexOf(niz[2]) === question[currentQuiz].correct ? answer : answer1}`;
            option4.innerHTML = `${currentQuizData.d} ${niz.indexOf(niz[3]) === question[currentQuiz].correct ? answer : answer1}`;

            timer = 0;
        }
        
        loadData();
        
        continueBtn.addEventListener("click", () => {
            document.body.style.backgroundImage = "url('css/images/bgd_geography.jpg')";
            quiz.style.display = "block";
            guide.style.display = "none";

            interval = setInterval(countDown, 1000);
            loadData();

            choice_que.forEach(removeActive => {
                removeActive.classList.remove("active");
            })
        
            total_correct.textContent = `${correct = 0} od ${question.length} pitanja`;
        });

        choice_que.forEach((choices, choiceNo) => {
            choices.addEventListener("click", () => {
                elementClicked = true;

                let correct1;
                let incorrect;
                correct1 = `<img src="css/images/correct.png" class="correct">`;
                incorrect = `<img src="css/images/incorrect.png" class="correct">`;

                loadData(correct1, incorrect);
                finishTime += parseInt(time.innerText);

                choices.classList.add("active");
                if (choiceNo === question[currentQuiz].correct) {
                    correct++;
                    if (correct > 6) {
                        trophy.src = "css/images/trophy.png";
                        trophy.classList.add("trophyGold");
                        result_message.textContent = "ČESTITAMO! 🎆🎆🎆";
                    } else {
                        trophy.src = "css/images/second.png";
                        trophy.classList.add("trophySilver");
                        result_message.textContent = "MOŽE TO I BOLJE 😩😩😩";
                    }
                } else {
                    correct += 0;
                }
                clearInterval(interval);

                if(correct === 0) {
                    trophy.src = "css/images/second.png";
                    trophy.classList.add("trophySilver");
                    result_message.textContent = "MOŽE TO I BOLJE 😩😩😩";
                }
        
                for (i = 0; i <= 3; i++) {
                    choice_que[i].classList.add("disabled");
                }
            })
        });

        next_question.addEventListener("click", function() {
            if(elementClicked) {
                elementClicked = false;
                if (currentQuiz !== question.length - 1) {
                    currentQuiz++;
                    choice_que.forEach(removeActive => {
                        removeActive.classList.remove("active");
                    });
    
                    loadData();
            
                    total_correct.style.display = "block";
                    total_correct.innerHTML = `${correct} od ${question.length} pitanja`;
                    clearInterval(interval);
                    interval = setInterval(countDown, 1000);
                    time.innerText = 0;
                } else {
                    currentQuiz = 0;
                    clearInterval(interval);
                    quiz.style.display = "none";
                    let finishTimeMS = finishTime * 1000;
                    points.innerHTML = `Pogodili ste ${correct} od ${question.length} pitanja za vreme ${sumTime(finishTimeMS)}`;
                    result.style.display = "grid";
                    localStorage.setItem(`thisScoreG`, correct);
                }
                for (i = 0; i <= 3; i++) {
                    choice_que[i].classList.remove("disabled");
                }

            }
        });

        quit.addEventListener("click", () => {
            window.location.href='/index.html';
            localStorage.removeItem(`thisScoreG`);
        });
        
        startAgain.addEventListener("click", () => {
            guide.style.display = "none";
            result.style.display = "none";
            location.reload();
            localStorage.removeItem(`thisScoreG`);
        });

        // Local Storage

        let highScores = JSON.parse(localStorage.getItem('highScoresG')) || [];
        
        let button = false;
        let patternName = /(^[A-Z][a-z]{0,8}[0-9]{0,4})/;

        function saveHighScore() {
            button = true;
            saveScore.disabled = button;
            username.disabled = button;
            saveScore.style.pointerEvents = `none`;
            let finishTimeMS = finishTime * 1000;
        
            const score = {
                score: correct,
                name: username.value,
                time: finishTime,
                convertTime: sumTime(finishTimeMS),
            };
            console.log(score);

            highScores.push(score);
            highScores.sort((a, b) => b.score - a.score || a.time - b.time);
            highScores.splice(7);
        
            localStorage.setItem('highScoresG', JSON.stringify(highScores));
            alert(`USPŠNO STE SAČUVALI VAŠ SKOR! ! !`);
            username.value = ``;
        };

        username.addEventListener(`keypress`, function(e) {
            let max_chars = 13;
            if (username.value.length >= max_chars) {
                username.value = username.value.slice(0, e.target.max_chars);
                e.preventDefault();
                return;
            }
        });

        saveScore.addEventListener("click", function() {
            if(username.value == '') {
                inputCheck.innerHTML = `Polje je prazno`;
            } else {
                if(!patternName.test(username.value)) {
                    inputCheck.innerHTML = `Neispravan format imena`;
                } else {
                    saveHighScore();
                    inputCheck.innerHTML = ``;
                    localStorage.removeItem(`thisScoreG`);
                }
            }
        });

        // Responsive JS

        window.addEventListener(`load`, responsive);
        window.addEventListener(`resize`, responsive);

        function responsive() {
            const width = window.innerWidth;
            if(width < 650) {
                start.style.fontSize = `1.1em`;
                guide.style.fontSize = `83%`;
                quiz.style.fontSize = `83%`;
                result.style.fontSize = `83%`;
            } else {
                start.style.fontSize = ``;
                guide.style.fontSize = ``;
                quiz.style.fontSize = ``;
                result.style.fontSize = ``;
            }
        }
      }
      if (this.status >= 400) {
        let greska = new Error("Request failed:" + xHr.statusText);
        console.log(greska);
      }
    }
    xHr.open("GET", `json/geografija/geografija${random}.json`);
    xHr.send();
}
podaciJson();
