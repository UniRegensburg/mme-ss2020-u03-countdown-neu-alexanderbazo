/* eslint-env browser */

import View from "./View.js";

class ResultView extends View {

    constructor(el) {
        super();
        this.setElement(el);
        this.pointsEl = this.el.querySelector(".points");
        this.hintEl = this.el.querySelector(".hint");
    }

    clear() {
        this.setPoints("");
        this.setHint("");
    }

    setPoints(points) {
        this.pointsEl.innerHTML = points;
    }

    setHint(hint) {
        this.hintEl.innerHTML = hint;
    }
    
}

export default ResultView;