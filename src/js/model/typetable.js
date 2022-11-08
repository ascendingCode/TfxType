export class TypeTable {
    constructor(id, wordsCollection) {
        this.id = id;
        this.errWordsIndexs = [];
        this.words = wordsCollection === undefined ? [] : wordsCollection;
        this.errCount = 0;
        this.currentWordIndex = 0;
        this.isCurrentWordInError = false;
    }
    setIndex(newIndex) {
        this.currentWordIndex = newIndex;
        this.isCurrentWordInError = false;
    }
    upIndex() {
        this.setIndex(this.currentWordIndex + 1);
    }
    setWordsCollection(words, reset) {
        if (reset && this.currentWordIndex != 0) {
            this.resetTable();
        }
        else {
            this.words = words;
            this.errWordsIndexs = [];
        }
    }
    setCurrentWordInError() {
        if (this.isCurrentWordInError)
            return;
        this.isCurrentWordInError = true;
        this.errCount++;
        this.errWordsIndexs.push(this.currentWordIndex);
    }
    unsetError() {
        if (!this.isCurrentWordInError)
            return;
        this.isCurrentWordInError = false;
        this.errCount--;
        this.errWordsIndexs = this.errWordsIndexs.filter((index) => {
            return index != this.currentWordIndex;
        });
    }
    getCurrentWord() {
        return this.words[this.currentWordIndex];
    }
    resetTable() {
        this.setIndex(0);
        this.errCount = 0;
        this.errWordsIndexs = [];
    }
}
