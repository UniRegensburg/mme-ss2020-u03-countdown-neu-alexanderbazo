/* eslint-env browser */

/**
 * Configuration object for values shared by multiple components
 */

const Config = {
  VOWELS: ["a", "e", "i", "o", "u"],
  CONSONANTS: ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p",
    "q", "r", "s", "t", "v", "w", "x", "y", "z",
  ],
  LETTER_FREQUENCY: {
    "a": 8.167,
    "b": 1.492,
    "c": 2.782,
    "d": 4.253,
    "e": 12.702,
    "f": 2.228,
    "g": 2.015,
    "h": 6.094,
    "i": 6.966,
    "j": 0.153,
    "k": 0.772,
    "l": 4.025,
    "m": 2.406,
    "n": 6.749,
    "o": 7.507,
    "p": 1.929,
    "q": 0.095,
    "r": 5.987,
    "s": 6.327,
    "t": 9.056,
    "u": 2.758,
    "v": 0.978,
    "w": 2.360,
    "x": 0.150,
    "y": 1.974,
    "z": 0.074,
  },
  MAX_CHARS: 9,
  POINTS_FOR_NINE_LETTER_WORD: 18,
  GAME_TIME_IN_MS: 10000,
  TIME_BEFORE_MENU_IS_SHOWN: 3000,
  CSS_HIDDEN_CLASS_NAME: "hidden",
  PATH_TO_BACKGROUND_MUSIC: "resources/data/countdown.ogg",
  POSITIVE_RESULT_MESSAGE: "Herzlichen Glückwunsch, Sie haben ein korrektes Wort eingegeben!",
  INVALID_COMBINATION_RESULT_MESSSAGE: "Ungültige Buchstabenkombination.",
  INVALID_WORD_RESULT_MESSAGE: "Das Wort wurde nicht im Wörterbuch gefunden",
};

Object.freeze(Config);

export default Config;