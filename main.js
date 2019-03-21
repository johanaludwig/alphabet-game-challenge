let questions = [
    { letter: "a", answer: "alligator", status: 0, question: "What is the largest reptile in North America?"},
    { letter: "b", answer: "blue whale", status: 0, question: "What’s the biggest animal in the world? "},
    { letter: "c", answer: "caracas", status: 0, question: "What’s the capital of Venezuela?"},
    { letter: "d", answer: "dumbledore", status: 0, question: "What’s the name of the headmaster of Hogwarts in the Harry Potter books?"},
    { letter: "e", answer: "east", status: 0, question: "North, South, _______, West, what’s missing?"},
    { letter: "f", answer: "freddie mercury", status: 0, question: "Who was the lead singer of the band Queen?"},
    { letter: "g", answer: "gold", status: 0, question: "What metal does the symbol Au represent on the periodic table?"},
    { letter: "h", answer: "hercules", status: 0, question: "Which characters in Greek mythology did 12 impossible tasks? "},
    { letter: "i", answer: "ironman", status: 0, question: "Tony Stark is the alta-ego of which superhero?"},
    { letter: "j", answer: "juventus", status: 0, question: "Which Italian football club based in Turin wears black and white stripes?"},
    { letter: "k", answer: "kilimanjaro", status: 0, question: "What’s the tallest mountain in Africa? "},
    { letter: "l", answer: "lady gaga", status: 0, question: "Which singer’s real name is Stefani Joanne Angelina Germanotta?"},
    { letter: "m", answer: "munich", status: 0, question: "Oktober fest is a beer festival which happens in which European city?"},
    { letter: "n", answer: "rafael nadal", status: 0, question: "Which tennis player won 9 French open titles between 2005 and 2014? "},
    { letter: "o", answer: "octupus", status: 0, question: "What sea creature with 8 legs is eaten in parts of Spain and Portugal?"},
    { letter: "p", answer: "vladimir putin", status: 0, question: "Who is the president of Russia? "},
    { letter: "q", answer: "quito", status: 0, question: "What is the capital of Ecuador?"},
    { letter: "r", answer: "rihanna", status: 0, question: "Which famous singer from the Caribbean has the surname Fenty? "},
    { letter: "s", answer: "kristen stewart", status: 0, question: "Which actress plays Bella Swan in the Twilight series? "},
    { letter: "t", answer: "transylvania", status: 0, question: "What historical region of Romania is considered the home of Dracula?"},
    { letter: "u", answer: "uruguay", status: 0, question: "1930, what country hosted and won the first football world cup? "},
    { letter: "v", answer: "vatician city", status: 0, question: "What’s the smallest country in the world?"},
    { letter: "w", answer: "woody", status: 0, question: "What is the name of the cowboy in the Toy Story films?"},
    { letter: "x", answer: "x-men", status: 0, question: "Cyclops, Iceman and Wolverine are member of which superhero group?"},
    { letter: "y", answer: "yankees", status: 0, question: "What’s the name of New Yorks most famous baseball team? "},
    { letter: "z", answer: "zoology", status: 0, question: "What is the name of the scientific study of animals?"},
]

let correct = 0;
let wrong = 0;
let answered = 0;
let counter = 0;
const form = document.getElementById('guess');
const input = form.querySelector('input');
const userData = document.getElementById('userData');
const buttonName = document.getElementById('buttonplayer');
const welcomeText = document.getElementById('welcomeText');

let currentQuestion = questions[counter].question;
let askQuestion = document.getElementById('askQuestion');
askQuestion.textContent = currentQuestion;

function game(questionId, playersAnswer) {
    document.getElementById("currentAnswer").innerHTML = playersAnswer;
        
    if (currentAnswer.textContent === '' && questions[questionId].status === 0 || currentAnswer.textContent === 'alphabetical' && questions[questionId].status === 0){ 
        counter = (questionId + 1);
    } else if (questions[questionId].status === 0 && currentAnswer.textContent.toLowerCase() === questions[questionId].answer){ 
        questions[questionId].status = 1; 
        correct++
        answered++
        counter = (questionId + 1);
    } else if (questions[questionId].status === 0 && currentAnswer !== questions[questionId].answer && currentAnswer !== 'end' && currentAnswer !== 'Alphabetical' && currentAnswer !== "") { 
        questions[questionId].status = 2;
        wrong++
        answered++
        counter = (questionId + 1);
    }
}

//Cambia texto enunciado
function changeQuestion(idx){
    askQuestion.innerHTML = questions[idx].question
}

//Status letras respondidas
function answerStatus(){

    guessRight.textContent = correct;
    guessWrong.textContent = wrong;
    currentAnswer.innerHTML = "";

    for(let i = 0; i < questions.length; i++){
        let change = document.getElementById(questions[i].answer)
        
        if (questions[i].status === 0){
            change.className="letter letterUp"
        } else if (questions[i].status === 1){
            change.className="correctAnswer"
        } else if (questions[i].status === 2){
            change.className="wrongAnswer"
        }
    }
}

function findNextUnansweredQuestion(minQuestion){
    for(let i = minQuestion; i < questions.length; i++) {
        if(questions[i].status == 0) {
            return i;
        }
    }
    
    return -1;
}

function finishGame() {
    buttonReset.style.display = "inline";
    guess.style.display = "none";
}

function resetGame() {
    guess.style.display = "inline";
    buttonReset.style.display = "none";

    for(let i = 0; i < questions.length; i++) {
        questions[i].status = 0;
    }

    counter = 0;
    answered = 0;
    wrong = 0;
    correct = 0;
    changeQuestion(0);
    answerStatus();
}

function isGameComplete() {
    if (answered === questions.length) {
        return true;
    }

    return false;
}

function play() {
    if (isGameComplete()) {
        finishGame();
        return;
    }

    let nextQuestionId = findNextUnansweredQuestion(counter);
    if (nextQuestionId === -1) {
        counter = 0;
        nextQuestionId = findNextUnansweredQuestion(counter);
    }

    game(nextQuestionId, input.value)
    input.value = '';
    answerStatus()

    if (isGameComplete()) {
        finishGame();
        return;
    }

    nextQuestionId = findNextUnansweredQuestion(counter);
    if (nextQuestionId === -1) {
        counter = 0;
        nextQuestionId = findNextUnansweredQuestion(counter);
    }

    changeQuestion(nextQuestionId);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    play();
});

buttonReset.addEventListener('click', () => {
    resetGame();
})



buttonPlayer.addEventListener('click', () => {
    const text = userData.value.toUpperCase();
    welcomeText.innerHTML = `Welcome ${text}!`;
    userData.value = '';
})

