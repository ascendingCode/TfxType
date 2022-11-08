import { TypeTableController } from "./controller/ttcontroller.js";

export type TypeResult = { 
    allWritedWords: number, 
    wordsWithError: number,
    withoutError: number
} | undefined
export class App{
    public readonly textInputID = 'user-input'
    public readonly timerDataID = 'timer-data'
    public sessionResult: TypeResult = undefined
    private writedWords: number = 0
    private isInputDisabled: boolean = true

    constructor(readonly controller: TypeTableController){}

    public initEvents(){
        var textInput: HTMLElement | null = document.getElementById(this.textInputID)
        if(textInput === null)
        {
            console.error("Cannot get text input")
            return
        }

        textInput.addEventListener('input', (ev) => {
            if(this.isInputDisabled)
                return

            this.controller.checkWordData(textInput?.value)
        })
        textInput.addEventListener('keypress', (key: KeyboardEvent) => {
            if(key.which != 32 || this.isInputDisabled) // if is not space or if input is disabled
                return
            
            this.controller.onFinished(textInput?.value)
            this.controller.setNextIndex()
            this.writedWords += 1
            textInput?.value = ''
        })
    }
    public startSession(secondCount: number){
        this.writedWords = 0
        this.isInputDisabled = false

        var second = 0
        var timer = document.getElementById(this.timerDataID)
        var id = setInterval(() => {
            timer?.innerHTML = `${second} s`
            second += 1
        }, 1000)

        setTimeout(() => {
            this.isInputDisabled = true
            clearInterval(id)

            this.sessionResult = {
                allWritedWords: this.writedWords,
                wordsWithError: this.controller.getErrorCount(),
                withoutError: this.writedWords - this.controller.getErrorCount()
            }
        }, (secondCount + 1) * 1000)

    }
    public renderTable(){
        this.controller.view.render()
    }
    public rebootTable(){
        this.controller.reboot()
    }
}