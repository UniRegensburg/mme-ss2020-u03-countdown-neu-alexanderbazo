/* eslint-env browser */

import View from "./View.js";

class ClockView extends View {

    constructor(el) {
        super();
        this.setElement(el);
        this.clockHand = this.el.querySelector(".hand");
    }

    start() {
        this.clockHand.classList.add("hand-animated");
    }

    reset() {
        this.clockHand.classList.remove("hand-animated");
    }
    
}

export default ClockView;