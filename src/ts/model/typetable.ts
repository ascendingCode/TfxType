export class TypeTable{

    public words: string[]
    public currentWordIndex: number
    public errCount: number
    public isCurrentWordInError: boolean
    public errWordsIndexs: number[] = []

    constructor(readonly id: string, wordsCollection?: string[]){
        this.words = wordsCollection === undefined ? [] : wordsCollection
        this.errCount = 0
        this.currentWordIndex = 0
        this.isCurrentWordInError = false
    }

    public setIndex(newIndex: number){
        this.currentWordIndex = newIndex
        this.isCurrentWordInError = false
    }

    public upIndex(){
        this.setIndex(this.currentWordIndex + 1)
    }

    public setWordsCollection(words: string[], reset: boolean){
        if(reset && this.currentWordIndex != 0){
            this.resetTable()
        } else {
            this.words = words
            this.errWordsIndexs = []
        }
        
    }

    public setCurrentWordInError(){
        if(this.isCurrentWordInError)
            return

        this.isCurrentWordInError = true
        this.errCount++
        this.errWordsIndexs.push(this.currentWordIndex)
    }

    public unsetError(){
        if(!this.isCurrentWordInError)
            return
        
        this.isCurrentWordInError = false
        this.errCount--
        this.errWordsIndexs = this.errWordsIndexs.filter((index: number) => {
            return index != this.currentWordIndex
        })
    }

    public getCurrentWord(){
        return this.words[this.currentWordIndex]
    }

    public resetTable(){
        this.setIndex(0)
        this.errCount = 0
        this.errWordsIndexs = []
    }
}