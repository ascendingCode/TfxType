export class TypeTableController {
    constructor(table, view, baseWordsCollection) {
        this.table = table;
        this.view = view;
        this.baseWordsCollection = baseWordsCollection;
        this.MAX_WORDS = 15;
        this.checkForOverflow = true;
        this.table.setWordsCollection(this.generateWordsCollection(), false);
    }
    getErrorCount() {
        return this.table.errCount;
    }
    generateWordsCollection() {
        var result = [];
        for (var i = 0; i < this.MAX_WORDS; i++) {
            var sum = 0;
            while (true) {
                var a = this._generateValue();
                var b = this._generateValue();
                var c = this._generateValue();
                if (c % 2 == 0)
                    sum = (a + b) - c;
                else
                    sum = a + b + c;
                if (sum < this.MAX_WORDS && sum >= 0)
                    break;
            }
            var index = 0;
            if (sum % 2 === 0 && sum != 0)
                index = this.baseWordsCollection.length - sum;
            else
                index += sum;
            result.push(this.baseWordsCollection[index]);
        }
        return result;
    }
    _generateValue() {
        return parseInt(Math.random().toString().substring(2)[3]);
    }
    checkWordData(_typeData) {
        _typeData = _typeData.trim();
        if (_typeData.length === 0) {
            this.table.unsetError();
            this.view.render();
            return;
        }
        var currentWord = this.table.getCurrentWord();
        if (_typeData.length > currentWord.length) {
            this.table.setCurrentWordInError();
            this.view.render();
            return;
        }
        for (var i = 0; i < _typeData.length; i++) {
            if (_typeData[i] != currentWord[i]) {
                this.table.setCurrentWordInError();
                this.view.render();
                return;
            }
        }
        if (this.table.isCurrentWordInError) {
            this.table.unsetError();
            this.view.render();
        }
    }
    onFinished(_typeData) {
        if (this.table.isCurrentWordInError)
            return;
        _typeData = _typeData.trim();
        var word = this.table.getCurrentWord();
        if (_typeData.length != word.length) {
            this.table.setCurrentWordInError();
            this.view.render();
        }
    }
    setNextIndex() {
        if (this.table.currentWordIndex + 1 >= this.MAX_WORDS) {
            var newWordsCollection = this.generateWordsCollection();
            this.table.setWordsCollection(newWordsCollection, false);
            this.table.setIndex(0);
            return;
        }
        this.table.upIndex();
    }
    reboot() {
        this.table.setWordsCollection(this.generateWordsCollection(), true);
    }
    _getfIndexByLength(numData, length) {
        for (var i = 0; i < numData.length; i++) {
            if (parseInt(numData[i]) < length) {
                return parseInt(numData[i]);
            }
        }
        return -1;
    }
}
