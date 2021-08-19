// variables to keep track of time and questions
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference HTML elements
var questionsDiv = document.getElementById('questions')
var timer = document.getElementById('time');
var choicesDiv = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById("start");
var initials = document.getElementById('intials');
var startDiv = document.getElementById("start-screen");

startBtn.onclick = startQuiz;

function startQuiz() {
    timerId = setInterval(clockTimer, 1000)

    questionsDiv.setAttribute("class", "show")
    startDiv.setAttribute("class", "hide")
    showQuestions()
}

function clockTimer() {
    time--;
    timer.textContent = time;

    if (time <= 0) {
        endQuiz()
    }
}

function showQuestions() {
    var currentQuestion = questions[currentQuestionIndex]

    var questionTitle = document.getElementById("question-title");
    questionTitle.textContent = currentQuestion.title;

    choicesDiv.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, i) {

        var choiceButton = document.createElement('button');
        choiceButton.setAttribute("class", "choice")
        choiceButton.setAttribute("value", choice);

        choiceButton.textContent = i + 1 + " " + choice;

        choicesDiv.append(choiceButton);
        choiceButton.onclick = choiceClick;
    })
}

var incorrect = 0;
function choiceClick() {

    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        incorrect++;
        if (time < 0) {
            time = 0;
        }

        timer.textContent = time;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        endQuiz()
    } else {
        showQuestions()
    }
}

function endQuiz() {
    clearInterval(timer)


    var endDiv = document.getElementById("end-screen");
    endDiv.setAttribute("class", "show");

    var finalScore = document.getElementById("final-score");

    var userScore = incorrect /= questions.length;

    var userScoreFinal = userScore.toFixed(2).split("0.");

    finalScore.textContent = userScoreFinal;

    
    submitBtn.addEventListener('click', function(){

        endDiv.setAttribute("class", "hide");
        startDiv.setAttribute("class", "show")

        var initialsInput = document.getElementById('initials');
        var userInitials = initialsInput.value;

        var highScoreDiv = document.getElementById("high-scores");

        highScoreDiv.setAttribute("class", "show");

        highScoreDiv.append(userInitials + " " + userScoreFinal);
    })

}