/* eslint-env browser */

class AudioPlayer {

    play() {
        if (!this.audio) {
            return;
        }
        this.audio.play();
    }

    stop() {
        if (!this.audio) {
            return;
        }
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    setFile(url) {
        this.audio = new Audio(url);
    }

}

export default new AudioPlayer();