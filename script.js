const welcomeScreen = document.getElementById("welcomeScreen");
const resultScreen = document.getElementById("resultScreen");
const startButton = document.getElementById("startButton");
const backButton = document.getElementById("backButton");
const againButton = document.getElementById("againButton");
const successButton = document.getElementById("successButton");
const failButton = document.getElementById("failButton");
const numberValue = document.getElementById("numberValue");
const resultCopy = document.getElementById("resultCopy");
const countdownShell = document.getElementById("countdownShell");
const countdownNumber = document.getElementById("countdownNumber");
const countdownText = document.getElementById("countdownText");
const confettiLayer = document.getElementById("confettiLayer");
const themePicker = document.getElementById("themePicker");
const themePickerCurrent = document.getElementById("themePickerCurrent");
const themeButtons = Array.from(document.querySelectorAll("[data-theme]"));

const themeMessages = {
	festival: ["Brillo festivo activado", "Luz de celebración lista"],
	day: ["Modo día activado", "Claridad total para jugar"],
	night: ["Modo noche activado", "Ambiente oscuro y elegante"],
};

let countdownTimerId = null;
let pendingNumber = null;
let countdownValue = 3;
let confettiClearTimerId = null;

function generateRandomNumber() {
	return Math.floor(Math.random() * 10) + 1;
}

function showScreen(screen) {
	const isResult = screen === "result";
	welcomeScreen.classList.toggle("d-none", isResult);
	resultScreen.classList.toggle("d-none", !isResult);
}

function resetOutcomeState() {
	document.body.classList.remove("result-success", "result-fail");
	numberValue.parentElement.classList.remove("victory", "defeat");
}

function setCountdownState(isActive) {
	resultScreen.classList.toggle("is-countdown", isActive);
	resultScreen.classList.toggle("is-revealed", !isActive);
	countdownShell.hidden = !isActive;
}

function setTheme(themeName) {
	document.body.classList.remove("theme-festival", "theme-day", "theme-night");
	document.body.classList.add(`theme-${themeName}`);
	themePickerCurrent.textContent = themeName === "festival" ? "Festivo" : themeName === "day" ? "Día" : "Noche";

	themeButtons.forEach((button) => {
		button.classList.toggle("is-active", button.dataset.theme === themeName);
	});

	themePicker.open = false;

	if (!resultScreen.classList.contains("d-none")) {
		const messages = themeMessages[themeName] || themeMessages.festival;
		resultCopy.textContent = messages[Math.floor(Math.random() * messages.length)];
	}
}

function revealPendingNumber() {
	if (pendingNumber === null) {
		return;
	}

	setCountdownState(false);
	resultScreen.classList.add("is-revealed");
	numberValue.textContent = String(pendingNumber);
	resultCopy.textContent = `Te ha salido el ${pendingNumber}. Pulsa "Número acertado" o "Número fallado".`;
	const card = numberValue.parentElement;
	card.classList.remove("victory", "defeat");
	void card.offsetWidth;
	card.classList.add("reveal-pop");
	window.setTimeout(() => {
		card.classList.remove("reveal-pop");
	}, 650);
	pendingNumber = null;
}

function runCountdown() {
	clearInterval(countdownTimerId);
	countdownTimerId = null;
	countdownValue = 3;
	countdownNumber.textContent = String(countdownValue);
	countdownText.textContent = "Pon el móvil en la cabeza";
	numberValue.textContent = "0";
	setCountdownState(true);
	resultScreen.classList.remove("is-revealed");
	resultCopy.textContent = "No mires. En tres segundos aparece el número.";

	countdownTimerId = window.setInterval(() => {
		countdownValue -= 1;
		if (countdownValue > 0) {
			countdownNumber.textContent = String(countdownValue);
			countdownText.textContent = countdownValue === 2 ? "Dos... no mires" : "Uno... agárralo bien";
			return;
		}

		clearInterval(countdownTimerId);
		countdownTimerId = null;
		countdownNumber.textContent = "0";
		countdownText.textContent = "Ya";
		window.setTimeout(revealPendingNumber, 240);
	}, 1000);
}

function prepareNewNumber() {
	resetOutcomeState();
	pendingNumber = generateRandomNumber();
	showScreen("result");
	runCountdown();
	window.scrollTo({ top: 0, behavior: "smooth" });
}

function triggerOutcome(isSuccess) {
	if (countdownTimerId !== null) {
		return;
	}

	clearTimeout(confettiClearTimerId);
	confettiLayer.innerHTML = "";
	confettiLayer.classList.add("d-none");

	const card = numberValue.parentElement;
	document.body.classList.toggle("result-success", isSuccess);
	document.body.classList.toggle("result-fail", !isSuccess);
	card.classList.remove("victory", "defeat");
	void card.offsetWidth;
	card.classList.add(isSuccess ? "victory" : "defeat");
	resultCopy.textContent = isSuccess
		? "Acertado. Fiesta activada en grande."
		: "Fallado. La pantalla entra en modo derrota.";

	if (isSuccess) {
		const colors = ["#facc15", "#22c55e", "#60a5fa", "#f472b6", "#fb7185", "#ffffff"];
		const confettiCount = 88;
		for (let index = 0; index < confettiCount; index += 1) {
			const piece = document.createElement("span");
			const size = 8 + Math.random() * 10;
			const startLeft = Math.random() * 100;
			const drift = (Math.random() * 2 - 1) * 180;
			const spin = (Math.random() * 2 - 1) * 1080;
			const fallDuration = 1100 + Math.random() * 900;

			piece.className = "confetti-piece";
			piece.style.setProperty("--piece-size", `${size}px`);
			piece.style.setProperty("--start-left", `${startLeft}vw`);
			piece.style.setProperty("--drift-x", `${drift}px`);
			piece.style.setProperty("--spin", `${spin}deg`);
			piece.style.setProperty("--fall-duration", `${fallDuration}ms`);
			piece.style.setProperty("--piece-color", colors[index % colors.length]);
			piece.style.animationDelay = `${Math.random() * 180}ms`;
			confettiLayer.appendChild(piece);
		}

		confettiLayer.classList.remove("d-none");
		confettiClearTimerId = window.setTimeout(() => {
			confettiLayer.classList.add("d-none");
			confettiLayer.innerHTML = "";
		}, 2600);
	}
}

startButton.addEventListener("click", prepareNewNumber);

againButton.addEventListener("click", prepareNewNumber);

successButton.addEventListener("click", () => {
	triggerOutcome(true);
});

failButton.addEventListener("click", () => {
	triggerOutcome(false);
});

backButton.addEventListener("click", () => {
	clearInterval(countdownTimerId);
	countdownTimerId = null;
	clearTimeout(confettiClearTimerId);
	confettiLayer.classList.add("d-none");
	confettiLayer.innerHTML = "";
	pendingNumber = null;
	setCountdownState(false);
	showScreen("welcome");
});

themeButtons.forEach((button) => {
	button.addEventListener("click", () => {
		setTheme(button.dataset.theme);
	});
});

setTheme("festival");
setCountdownState(false);
