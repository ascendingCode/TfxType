import { TypeTable } from "../model/typetable.js";
import { TypeTableView } from "../view/ttview.js";

export class TypeTableController{

    public readonly MAX_WORDS: number = 15
    public readonly checkForOverflow: boolean = true   

    constructor(readonly table: TypeTable, readonly view: TypeTableView,  readonly baseWordsCollection: string[]){
        this.table.setWordsCollection(this.generateWordsCollection(), false)
    }

    public getErrorCount(): number{
        return this.table.errCount
    }

    public generateWordsCollection(): string[]{
        var result: string[] = []
        
        for(var i = 0; i < this.MAX_WORDS; i++){
            var sum: number = 0
            while(true)
            {
                var a: number = this._generateValue()
                var b: number = this._generateValue()
                var c: number = this._generateValue()
                if(c % 2 == 0)
                    sum = (a + b) - c
                else
                    sum = a + b + c
                
                if(sum < this.MAX_WORDS && sum >= 0)
                    break
            }
    
            var index: number = 0
            if(sum % 2 === 0 && sum != 0)
                index = this.baseWordsCollection.length - sum
            else
                index += sum
            
            result.push(this.baseWordsCollection[index])
        }
        return result
    }
    private _generateValue(): number{
        return parseInt(Math.random().toString().substring(2)[3])
    }
    public checkWordData(_typeData: string){
        _typeData = _typeData.trim()

        if(_typeData.length === 0) {
            this.table.unsetError()
            this.view.render()
            return
        }

        var currentWord: string = this.table.getCurrentWord()
        if(_typeData.length > currentWord.length){
            this.table.setCurrentWordInError()
            this.view.render()
            return
        }

        for(var i = 0; i < _typeData.length; i++){
            if(_typeData[i] != currentWord[i]){
                this.table.setCurrentWordInError()
                this.view.render()
                return
            }
        }

        if(this.table.isCurrentWordInError){
            this.table.unsetError()
            this.view.render()
        }

    }

    public onFinished(_typeData: string){
        if(this.table.isCurrentWordInError)
            return

        _typeData = _typeData.trim()
        var word: string = this.table.getCurrentWord()

        if(_typeData.length != word.length)
        {
            this.table.setCurrentWordInError()
            this.view.render()
        }
    }

    public setNextIndex(){
        if(this.table.currentWordIndex + 1 >= this.MAX_WORDS){
            var newWordsCollection: string[] = this.generateWordsCollection()
            this.table.setWordsCollection(newWordsCollection, false)
            this.table.setIndex(0)
            return
        }
        this.table.upIndex()
    }

    public reboot(){
        this.table.setWordsCollection(this.generateWordsCollection(), true)
    }
    private _getfIndexByLength(numData: string, length: number): number{
        for(var i = 0; i < numData.length; i++){
            if(parseInt(numData[i]) < length){
                return parseInt(numData[i])
            }
        }
        return -1
    }
}