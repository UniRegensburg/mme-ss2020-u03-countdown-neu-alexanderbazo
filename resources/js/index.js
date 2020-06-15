/* eslint-env browser */

import Config from "./utils/Config.js";
import AudioPlayer from "./utils/AudioPlayer.js";
import GameManager from "./game/GameManager.js";
import ClockView from "./ui/ClockView.js";
import LetterView from "./ui/LetterView.js";
import MenuView from "./ui/MenuView.js";
import ResultView from "./ui/ResultView.js";
import ControlsView from "./ui/ControlsView.js";

let menuView,
	controlsView,
	letterView,
	clockView,
	resultsView;

function init() {
	initGameManager();
	initUI();
	initAudio();
}

function initGameManager() {
	GameManager.addEventListener("CharAdded", onCharAdded);
	GameManager.addEventListener("LastCharAdded", onLastCharAdded);
	GameManager.addEventListener("CountdownStarted", onCountdownStarted);
	GameManager.addEventListener("CountdownStopped", onCountdownStopped);
}

function initUI() {
	let menuEl = document.querySelector(".menu-screen"),
		controlsEl = document.querySelector(".controls"),
		lettersEl = document.querySelector(".letters"),
		clockEl = document.querySelector(".clock"),
		resultsEl = document.querySelector(
			".results");
	menuView = new MenuView(menuEl);
	menuView.addEventListener("StartButtonClicked", startGame);
	controlsView = new ControlsView(controlsEl);
	controlsView.addEventListener("AddVowel", addVowel);
	controlsView.addEventListener("AddConsonant", addConsonant);
	letterView = new LetterView(lettersEl);
	clockView = new ClockView(clockEl);
	resultsView = new ResultView(resultsEl);
}

function initAudio() {
	AudioPlayer.setFile(Config.PATH_TO_BACKGROUND_MUSIC);
}

function startGame() {
	menuView.hide();
	controlsView.clear();
	controlsView.disable();
	letterView.clear();
	resultsView.clear();
	resultsView.hide();
	clockView.reset();
	GameManager.reset();
}

function addVowel() {
	GameManager.addRandomVowel();
}

function addConsonant() {
	GameManager.addRandomConsonant();
}

function showResults(results) {
	resultsView.setPoints(results.points);
	resultsView.setHint(results.hint);
	resultsView.show();
	setTimeout(() => menuView.show(), Config.TIME_BEFORE_MENU_IS_SHOWN);
}

function onCharAdded(event) {
	letterView.addLetter(event.data);
}

function onLastCharAdded() {
	GameManager.startCountdown();
}

function onCountdownStarted() {
	clockView.start();
	AudioPlayer.play();
	controlsView.focus();
	controlsView.enable();
}

function onCountdownStopped() {
	clockView.reset();
	AudioPlayer.stop();
	let word = controlsView.getUserInput();
	GameManager.validateWord(word).then((results) => {
		showResults(results);
	}).catch((results) => {
		showResults(results);
	});
}

init();