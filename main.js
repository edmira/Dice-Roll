

const startButton = document.querySelector(".btn-start");
const startMenu = document.querySelector(".start-menu");
const dashBoard = document.querySelector(".game");
const dice = document.querySelector(".dice");
const btns = document.querySelectorAll(".btn");
const rollBtn = document.querySelector(".btn-roll");
const holdBtn = document.querySelector(".btn-hold");
const resetBtn = document.querySelector(".btn-reset");
const scores = document.querySelectorAll(".total-score");
const scoreCounters = document.querySelectorAll(".score-counter");

const pressStart = startButton.addEventListener("click", function () {
	startMenu.classList.add("hidden");
	dashBoard.classList.remove("hidden");
});

const playSound = function () {
	const sound = new Audio("sounds/button_sound.mp3");
	sound.play();
};
const playSound2 = function () {
	const sound2 = new Audio ("sounds/button_laugh.mp3");
	sound2.play();
}

let diceRoll, currentScore, playerScore1, playerScore2, playing;
let currentPlayer = 1;

const gameStart = function () {
	dice.classList.add("hidden");
	document.querySelector(`.player-${currentPlayer}`).classList.remove("winner");
	document.querySelector(`.player-${currentPlayer}`).classList.remove("active");
	for (let i = 0; i < scores.length; i++) {
		scores[i].textContent = 0;
		scoreCounters[i].textContent = 0;
	}
	currentScore = 0;
	playerScore1 = 0;
	playerScore2 = 0;
	playing = true;
	diceRoll = 0;
	currentPlayer = 1;
	document.querySelector(`.player-${currentPlayer}`).classList.add("active");
};
gameStart();

const playerSwap = function () {
	currentScore = 0;
	document.querySelector(`.player-${currentPlayer}`).classList.remove("active");
	currentPlayer = currentPlayer === 1 ? 2 : 1;
	document.querySelector(`.player-${currentPlayer}`).classList.add("active");
};

const roll = function () {
	if (playing) {
		
		diceRoll = Math.trunc(Math.random() * 6) + 1;
		playSound();

		
		dice.classList.remove("hidden");
		dice.src = `images/dice-${diceRoll}.png`;

		
		currentScore += diceRoll;
		document.querySelector(
			`.score-counter-${currentPlayer}`
		).textContent = currentScore;

		
		if (diceRoll === 1) {
			document.querySelector(`.score-counter-${currentPlayer}`).textContent = 0;
			playerSwap();
		}
	}
};
rollBtn.addEventListener("click", roll);

const addPoints = function (playerScore) {
	document.querySelector(
		`.total-score-${currentPlayer}`
	).textContent = playerScore;
};

const hold = function () {
	if (playing) {

		if (currentPlayer === 1) {
			playerScore1 += currentScore;
			scores[0].textContent = playerScore1;
		} else {
			playerScore2 += currentScore;
			scores[1].textContent = playerScore2;
		}

		if (playerScore1 >= 20 || playerScore2 >= 20) {
			playing = false;
			document
				.querySelector(`.player-${currentPlayer}`)
				.classList.toggle("winner");
				playSound2();
			document
				.querySelector(`.player-${currentPlayer}`)
				.classList.remove("active");
			document.querySelector(`.score-counter-${currentPlayer}`).textContent = 0;
			dice.classList.add("hidden");
		} else {

			document.querySelector(`.score-counter-${currentPlayer}`).textContent = 0;
			playerSwap();
		}
	}
};
holdBtn.addEventListener("click", hold);

resetBtn.addEventListener("click", gameStart);

document.querySelector(".btn-about").addEventListener("click", function () {
	document.querySelector(".about").classList.remove("hidden");
	document.querySelector(".overlay").classList.remove("hidden");
});
document
	.querySelector(".btn-close-about")
	.addEventListener("click", function () {
		document.querySelector(".about").classList.add("hidden");
		document.querySelector(".overlay").classList.add("hidden");
	});

