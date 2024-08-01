let questions = [
    {
        question: "If a=2 and b=3 then c=? IF a+c=b?",
        options: ["3", "2", "1", "4"],
        correctAnswer: 3
    },
    {
        question: "If a=5 and c=30 then b=? IF a.b=c?",
        options: ["3", "6", "2", "0"],
        correctAnswer: 2
    },
    {
        question: "If a=2 and b=3 , c=4 then d=? IF a+c=b.d?",
        options: ["1", "2", "15", "7"],
        correctAnswer: 2
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let totalScore = 0;

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".start-btn").addEventListener("click", function () {
        document.getElementById("home-page").style.display = "none";
        document.querySelector(".quiz-page").style.display = "block";
        displayQuestion();
    });

    document.querySelector(".next").addEventListener("click", function () {
        let userAnswer = document.querySelector("input[name='option']:checked");
        if (userAnswer) {
            userAnswers.push(userAnswer.value);
            userAnswer.checked = false;
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                displayQuestion();
            } else {
                calculateScore();
                displayResult();
            }
        } else {
            alert("Please select an option");
        }
    });

    document.querySelector(".previous").addEventListener("click", function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            userAnswers.pop();
            displayQuestion();
        }
    });

    document.querySelector(".submit").addEventListener("click", function () {
        let userAnswer = document.querySelector("input[name='option']:checked");
        if (userAnswer) {
            userAnswers.push(userAnswer.value);
            userAnswer.checked = false;
            calculateScore();
            displayResult();
        } else {
            alert("Please select an option");
        }
    });

    document.querySelector(".play-again").addEventListener("click", function () {
        currentQuestionIndex = 0;
        userAnswers = [];
        totalScore = 0;
        document.getElementById("result-page").style.display = "none";
        document.querySelector(".quiz-page").style.display = "block";
        displayQuestion();
    });
});

function displayQuestion() {
    let questionElement = document.querySelector(".question");
    let optionsElement = document.querySelector(".options");
    let currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        let optionElement = document.createElement("li");
        optionElement.innerHTML = `
            <input type="radio" id="option${index + 1}" name="option" value="${index + 1}">
            <label for="option${index + 1}">${option}</label>
        `;
        optionsElement.appendChild(optionElement);
    });
}

function calculateScore() {
    totalScore = 0;
    userAnswers.forEach((userAnswer, index) => {
        if (userAnswer == questions[index].correctAnswer) {
            totalScore++;
        }
    });
}

function displayResult() {
    document.querySelector(".quiz-page").style.display = "none";
    document.getElementById("result-page").style.display = "block";
    document.querySelector(".final-score").textContent = `You scored ${totalScore} out of ${questions.length}`;
    document.querySelector(".final-message").textContent = `Well done! You got ${totalScore} questions correct.`;
}