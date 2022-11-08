export class App {
    constructor(controller) {
        this.controller = controller;
        this.textInputID = 'user-input';
        this.timerDataID = 'timer-data';
        this.sessionResult = undefined;
        this.writedWords = 0;
        this.isInputDisabled = true;
    }
    initEvents() {
        var textInput = document.getElementById(this.textInputID);
        if (textInput === null) {
            console.error("Cannot get text input");
            return;
        }
        textInput.addEventListener('input', (ev) => {
            if (this.isInputDisabled)
                return;
            this.controller.checkWordData(textInput === null || textInput === void 0 ? void 0 : textInput.value);
        });
        textInput.addEventListener('keypress', (key) => {
            if (key.which != 32 || this.isInputDisabled) // if is not space or if input is disabled
                return;
            this.controller.onFinished(textInput === null || textInput === void 0 ? void 0 : textInput.value);
            this.controller.setNextIndex();
            this.writedWords += 1;
            textInput === null || textInput === void 0 ? void 0 : textInput.value = '';
        });
    }
    startSession(secondCount) {
        this.writedWords = 0;
        this.isInputDisabled = false;
        var second = 0;
        var timer = document.getElementById(this.timerDataID);
        var id = setInterval(() => {
            timer === null || timer === void 0 ? void 0 : timer.innerHTML = `${second} s`;
            second += 1;
        }, 1000);
        setTimeout(() => {
            this.isInputDisabled = true;
            clearInterval(id);
            this.sessionResult = {
                allWritedWords: this.writedWords,
                wordsWithError: this.controller.getErrorCount(),
                withoutError: this.writedWords - this.controller.getErrorCount()
            };
        }, (secondCount + 1) * 1000);
    }
    renderTable() {
        this.controller.view.render();
    }
    rebootTable() {
        this.controller.reboot();
    }
}
