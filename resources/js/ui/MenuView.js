/* eslint-env browser */

import View from "./View.js";
import { Event } from "../utils/Observable.js";

function broadcastGameStartEvent() {
    let event = new Event("StartButtonClicked");
    this.notifyAll(event);
}

class MenuView extends View {

    constructor(el) {
        super();
        this.setElement(el);
        this.el.querySelector(".start-game").addEventListener("click", broadcastGameStartEvent.bind(this));
    }

}

export default MenuView;