const settingBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const endGameContainer = document.getElementById("end-game-container");
const word = document.getElementById("word");
const wordInput = document.getElementById("wordInput");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const difficulty = document.getElementById("difficulty");

let time = 10;
let score = 0;

// 랜덤 단어 만들기

const randomWordGenerator = async () => {
  const res = await fetch(`https://random-word-api.herokuapp.com/word`);

  const data = await res.json();

  const randomWord = data[0];

  addWordToDOM(randomWord);
};

// 브라우저에 띄우기

const addWordToDOM = (randomWord) => {
  word.textContent = randomWord;
};

// 모달창 띄우기

const showDifficultyModal = () => {
  settings.classList.toggle("show");
};

// 점수 업데이트

const updateScore = () => {
  score++;
  scoreEl.textContent = `${score}개`;
};

// 시간 업데이트

const addTime = () => {
  if (difficulty.value === "easy") {
    time += 5;
  } else if (difficulty.value === "medium") {
    time += 3;
  } else if (difficulty.value === "easy") {
    time += 2;
  }
};

// 답 체크

const checkAnswer = (e) => {
  if (e.target.value == word.textContent) {
    randomWordGenerator();
    updateScore();
    addTime();
    e.target.value = "";
  } else {
    return null;
  }
};

// 시간 초과 됐을때

const updateTime = () => {
  timeEl.innerText = `${time}초`;
  time--;

  if (time < 0) {
    endGameContainer.innerHTML = ` <h1>시간 초과</h1>
    <p>최종 점수는 ${score}점 입니다.</p>
    <div class="buttonContainer"><button onclick="location.reload()">다시 시작</button></div>`;
    endGameContainer.style.display = "flex";
  }
};


randomWordGenerator();

setInterval(() => {
  updateTime();
}, 1000);

settingBtn.addEventListener("click", showDifficultyModal);
wordInput.addEventListener("input", checkAnswer);
