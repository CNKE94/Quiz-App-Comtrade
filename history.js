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

function podaciJson() {
  let xHr = new XMLHttpRequest();
  
  xHr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let question = JSON.parse(this.responseText);
        console.log(question);
        
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
      }
      if (this.status >= 400) {
        let greska = new Error("Request failed:" + xHr.statusText);
        console.log(greska);
      }
  }
  xHr.open("GET", "json/istorija.json");
  xHr.send();
}
podaciJson();
