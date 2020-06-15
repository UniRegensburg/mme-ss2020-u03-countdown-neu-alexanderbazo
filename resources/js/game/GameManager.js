/* eslint-env browser */

import Config from "../utils/Config.js";
import { Event, Observable } from "../utils/Observable.js";
import LetterGenerator from "./LetterGenerator.js";
import WiktionaryClient from "../wiktionary/Wiktionary.js";

var currentLetters,
    countdownTimeout;

function broadcastEvent(type, data) {
    let event = new Event(type, data);
    this.notifyAll(event);
}

function getResultObjectForValidWord(word) {
    let points = (word.length === Config.MAX_CHARS) ? Config.POINTS_FOR_NINE_LETTER_WORD : word.length;
    return getResultObject(word, Config.POSITIVE_RESULT_MESSAGE, points);
}

function getResultObject(word, hint, points) {
    return {
        word: word,
        hint: hint,
        points: points,
    };
}

function addChar(char) {
    if (currentLetters.length < Config.MAX_CHARS) {
        currentLetters.push(char);
        broadcastEvent.call(this, "CharAdded", char);
    }
    if (currentLetters.length === Config.MAX_CHARS) {
        broadcastEvent.call(this, "LastCharAdded");
    }
}

function isValidCharCombination(word) {
    let result = word.toUpperCase();
    for (let i = 0; i < currentLetters.length; i++) {
        result = result.replace(currentLetters[i].toUpperCase(), "");
    }
    if (result.length === 0) {
        return true;
    }
    return false;
}

function onTimeout() {
    let event = new Event("CountdownStopped");
    this.notifyAll(event);
}

function clearCountdownTimeoutIfRunning() {
    if (countdownTimeout) {
        clearTimeout(countdownTimeout);
    }
}

class GameManager extends Observable {

    reset() {
        clearCountdownTimeoutIfRunning();
        LetterGenerator.reset();
        currentLetters = [];
    }

    startCountdown() {
        countdownTimeout = setTimeout(onTimeout.bind(this), Config.GAME_TIME_IN_MS);
        broadcastEvent.call(this, "CountdownStarted");
    }

    addRandomVowel() {
        let vowel = LetterGenerator.getVowel();
        addChar.call(this, vowel);
    }

    addRandomConsonant() {
        let consonant = LetterGenerator.getConsonant();
        addChar.call(this, consonant);
    }

    validateWord(word) {
        return new Promise(function (resolve, reject) {
            let isUsingCorrectLetters = isValidCharCombination(word);
            if (!isUsingCorrectLetters) {
                let result = getResultObject(word, Config.INVALID_COMBINATION_RESULT_MESSSAGE, 0);
                reject(result);
            } else {
                let wc = new WiktionaryClient();
                wc.assertWordExist(word).then(function () {
                    let result = getResultObjectForValidWord(word);
                    resolve(result);
                }).catch(function () {
                    let result = getResultObject(word, Config.INVALID_WORD_RESULT_MESSAGE, 0);
                    resolve(result);
                });
            }
        });
    }

}

export default new GameManager();