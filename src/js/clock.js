export class Clock {
    constructor() {
        this.currentSecond = 0;
        this.isFinished = false;
    }
    start(secondCount, callback) {
        var id = setInterval(() => {
            if (this.currentSecond === secondCount) {
                clearInterval(id);
                return;
            }
            this.currentSecond += 1;
            callback();
        }, 1000);
    }
}
