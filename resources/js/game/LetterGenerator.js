/* eslint-env browser */

import Config from "../utils/Config.js";

let vowels,
    consonants;

function shuffleStack(stack) {
    let j, x, i;
    for (i = stack.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = stack[i - 1];
        stack[i - 1] = stack[j];
        stack[j] = x;
    }
}

function prepareStacks(letterFreq) {
    let target;
    vowels = [];
    consonants = [];
    /**
     * letterFreq is an object parsed from resources/data/letter-freq.json
     * Each property of letterFreq represents an letter and its frequency:
     * {
     * "a": 8.167,
     * "b": 1.492,
     * "c": 2.782,
     * "d": 4.253,
     * ...
     */
    for (let char in letterFreq) {
        if (Object.prototype.hasOwnProperty.call(letterFreq, char)) {
            // rounding the current letter's frequency
            let freq = Math.floor(letterFreq[char]);
            target = undefined;
            // selecting the correct array (stack)
            if (Config.VOWELS.includes(char)) {
                target = vowels;
            } else if (Config.CONSONANTS.includes(char)) {
                target = consonants;
            }
            // Adding the current letter n-times (freq) to the array
            if (target) {
                for (let i = 0; i < freq; i++) {
                    target.push(char);
                }
            }
        }
    }
    shuffleStack(vowels);
    shuffleStack(consonants);
}

function selectRandomCharFrom(chars) {
    let randomIndex = Math.floor(Math.random() * (chars.length - 1)),
        randomChar = chars[randomIndex];
    chars.splice(randomIndex, 1);
    return randomChar;
}

class LetterGenerator {

    reset() {
        prepareStacks(Config.LETTER_FREQUENCY);
    }

    getVowel() {
        return selectRandomCharFrom(vowels);
    }

    getConsonant() {
        return selectRandomCharFrom(consonants);
    }

}

export default new LetterGenerator();