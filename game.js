const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Which team won the recently ended NBA Championship?",
    choice1: "Miami Heat",
    choice2: "Denver Nuggets",
    choice3: "Los Angeles Lakers",
    choice4: "Golden State Warriors",
    answer: 3,
  },
  {
    question: "Who won the 2020 NBA Finals MVP?",
    choice1: "Giannis Antetekounmpo",
    choice2: "LeBron James",
    choice3: "Anthony Davids",
    choice4: "James Harden",
    answer: 2,
  },
  {
    question: "Who is the sitting American President?",
    choice1: "Barack Obama",
    choice2: "Bill Clinton",
    choice3: "Queen Elizabeth",
    choice4: "Donald Trump",
    answer: 4,
  },
];

// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3; 

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions =  [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

	const classToApply = 
		selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
		
		if (classToApply == 'correct') {
			incrementScore(CORRECT_BONUS);
		}
	selectedChoice.parentElement.classList.add(classToApply);
	
	setTimeout( () =>{
		selectedChoice.parentElement.classList.remove(classToApply);
		getNewQuestion();
	}, 1000);
	
  });
});
incrementScore = num => {
	score +=num;
	scoreText.innerText = score;
}

startGame();
