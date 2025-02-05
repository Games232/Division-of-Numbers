const startScreen = document.getElementById('start-screen');
const videoScreen = document.getElementById('video-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');


let currentQuestionIndex = 0;
let score = 0;

const questions = [
    { question: "المقسوم ÷ المقسوم عليه = ؟", answer: "ناتج القسمة", options: ["ناتج القسمة", "جمع القسمة", "المضروب", "ناتج الجمع"] },
    { question: "= 3 ÷ 15", answer: 5, options: [3, 5, 10, 2] },
    { question: "= 5 ÷ 20 ", answer: 4, options: [4, 5, 10, 6] },
    { question: "= 4 ÷ 8 ", answer: 2, options: [5, 10, 2, 20] },
    { question: "= 6 ÷ 12 ", answer: 2, options: [5, 6, 2, 3] },
    { question: "= 5 ÷ 30 ", answer: 6, options: [5, 7, 10, 6] },
    { question: "= 3 ÷ 9  ", answer: 3, options: [5, 3, 10, 4] },
    { question: "= 9 ÷ 27 ", answer: 3, options: [5, 9, 10, 3] },
    { question: "= 4 ÷ 16 ", answer: 4, options: [5, 10, 4, 20] }
];



document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("info-screen").style.display = "flex";
});

document.getElementById("proceed-button").addEventListener("click", () => {
    document.getElementById("info-screen").style.display = "none";
    document.getElementById("video-screen").style.display = "block";
});

nextButton.addEventListener('click', startGame);

function showVideoScreen() {
    startScreen.style.display = 'none';
    videoScreen.style.display = 'block';
}

function startGame() {
    videoScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-button');
            button.addEventListener('click', () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });
        feedbackElement.textContent = '';
    } else {
        endGame();
    }
}

// ربط عناصر الصوت
const loseSound = document.getElementById('lose-sound');
const loseSound2 = document.getElementById('lose-sound2');
const winSound = document.getElementById('win-sound');
const winSound2 = document.getElementById('win-sound2');

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    let body = document.body;

    if (selectedAnswer === correctAnswer) {
        createConfetti();
        winSound.play(); // تشغيل صوت الفوز
        winSound2.play(); // تشغيل صوت الفوز
        score += 1; // زيادة النقاط
        scoreElement.textContent = `النقاط: ${score}`; // تحديث النقاط في الواجهة
        currentQuestionIndex++; // الانتقال إلى السؤال التالي فقط إذا كانت الإجابة صحيحة
        setTimeout(loadQuestion, 1500); // تحميل السؤال التالي بعد فترة قصيرة
    } else {
        // تشغيل صوت الخسارة
        loseSound.play();
        loseSound2.play();

        // تفعيل اهتزاز الشاشة
        body.classList.add("shake");
        setTimeout(() => body.classList.remove("shake"), 500);
    }
}


function endGame() {
    gameScreen.style.display = 'none'; // إخفاء شاشة اللعبة
    endScreen.style.display = 'block'; // إظهار شاشة النهاية
    finalScoreElement.textContent = score; // تحديث النقاط النهائية في شاشة النهاية
}


function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = 'النقاط: 0';
    endScreen.style.display = 'none';
    startScreen.style.display = 'block';
}
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.classList.remove('hidden');

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');

        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

        confettiContainer.appendChild(confetti);

        const fallDuration = Math.random() * 1 + 1;
        confetti.style.animationDuration = `${fallDuration}s`;

        setTimeout(() => {
            confetti.remove();
        }, fallDuration * 1000);
    }
}

function showEndScreen(score) {
    const endScreen = document.getElementById('end-screen');
    const finalScore = document.getElementById('final-score');
    finalScore.textContent = score; // عرض النقاط
    endScreen.classList.remove('hidden'); // إظهار الشاشة
  }
  
  
