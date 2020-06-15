/* eslint-env browser */

import View from "./View.js";
import { Event } from "../utils/Observable.js";

function broadcastLetterEvent(type) {
    let event = new Event(type);
    this.notifyAll(event);
}

class ControlsView extends View {

    constructor(el) {
        super();
        this.setElement(el);
        this.inputEl = this.el.querySelector(".word-input");
        this.el.querySelector(".add-vowel").addEventListener("click", broadcastLetterEvent.bind(this, "AddVowel"));
        this.el.querySelector(".add-consonant").addEventListener("click", broadcastLetterEvent.bind(this, "AddConsonant"));
    }

    clear() {
        this.inputEl.value = "";
    }

    enable() {
        this.inputEl.disabled = false;
    }

    disable() {
        this.inputEl.disabled = true;
    }

    focus() {
        this.inputEl.focus();
    }

    getUserInput() {
        return this.inputEl.value;
    }


}

export default ControlsView;