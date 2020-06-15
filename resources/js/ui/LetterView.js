/* eslint-env browser */

import View from "./View.js";

class LetterView extends View {

    constructor(el) {
        super();
        this.setElement(el);
    }

    clear() {
        let letters = this.el.querySelectorAll(".letter");
        for (let i = 0; i < letters.length; i++) {
            letters[i].innerHTML = "";
            letters[i].classList.add("empty");
        }
    }

    addLetter(letter) {
        let nextLetterElement = this.el.querySelector(".letter.empty");
        if (nextLetterElement !== undefined) {
            nextLetterElement.innerHTML = letter;
            nextLetterElement.classList.remove("empty");
        }
    }

}

export default LetterView;