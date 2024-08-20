// サンプル問題
const problems = [
    { japanese: "こんにちは", romaji: "konnichiwa" },
    { japanese: "さようなら", romaji: "sayounara" },
    { japanese: "ありがとう", romaji: "arigatou" }
];

let currentProblemIndex = 0;
let currentInput = "";
let mistakes = 0;

const startButton = document.getElementById("start-button");
const gameArea = document.getElementById("game-area");
const questionJapanese = document.getElementById("question-japanese");
const questionRomaji = document.getElementById("question-romaji");
const inputArea = document.getElementById("input-area");
const nextButton = document.getElementById("next-button");
const errorMessage = document.getElementById("error-message");
const mistakeCount = document.getElementById("mistake-count");
const gameOverMessage = document.getElementById("game-over");
const statusImage = document.getElementById("status-image");

startButton.addEventListener("click", startGame);
inputArea.addEventListener("input", handleInput);
nextButton.addEventListener("click", nextProblem);
inputArea.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        nextProblem();
    }
});

function startGame() {
    currentProblemIndex = 0;
    mistakes = 0;
    gameArea.style.display = "block";
    startButton.style.display = "none";
    gameOverMessage.style.display = "none";
    statusImage.src = "images/2.jpg";  // タイピング中の画像
    loadProblem();
}

function loadProblem() {
    const problem = problems[currentProblemIndex];
    questionJapanese.textContent = problem.japanese;
    updateRomajiDisplay(problem.romaji, "");
    inputArea.value = "";
    inputArea.focus();
    errorMessage.textContent = "";
    mistakeCount.textContent = "";
}

function handleInput() {
    const problem = problems[currentProblemIndex];
    currentInput = inputArea.value;
    if (problem.romaji.startsWith(currentInput)) {
        updateRomajiDisplay(problem.romaji, currentInput);
        errorMessage.textContent = "";
    } else {
        mistakes++;
        errorMessage.textContent = mistakes + "回目のミス";
        inputArea.value = currentInput.slice(0, -1);  // 最後の入力を削除
        if (mistakes >= 3) {
            endGame();
        }
    }
}

function updateRomajiDisplay(fullRomaji, correctPart) {
    const correctText = `<span style="color: green;">${correctPart}</span>`;
    const remainingText = fullRomaji.slice(correctPart.length);
    questionRomaji.innerHTML = correctText + remainingText;
}

function nextProblem() {
    const problem = problems[currentProblemIndex];
    if (currentInput === problem.romaji) {
        statusImage.src = "images/3.jpg";  // 1問クリアの画像
        setTimeout(() => {
            // 全問クリアのときは「4.png」、それ以外は「2.jpg」
            if (currentProblemIndex + 1 === problems.length) {
                statusImage.src = "images/4.png";  // 全問クリアの画像
                alert("すべての問題をクリアしました！");
                resetGame();
            } else {
                statusImage.src = "images/2.jpg";  // タイピング中の画像に戻す
                currentProblemIndex++;
                loadProblem();
            }
        }, 1000); // 1秒表示
    } else {
        alert("まだ入力が完了していません。");
    }
}

function endGame() {
    gameArea.style.display = "none";
    gameOverMessage.style.display = "block";
    startButton.style.display = "block";
    statusImage.src = "images/5.jpg";  // ゲームオーバーの画像
    startButton.textContent = "もう一度プレイ";
}

function resetGame() {
    gameArea.style.display = "none";
    startButton.style.display = "block";
    statusImage.src = "images/1.png";  // 初め画面の画像
    startButton.textContent = "スタート";
}
