export class TypeTableView {
    constructor(model) {
        this.model = model;
        this.COL_CLASS = 'col-5 col-md-2 m-1';
    }
    render() {
        this.clearTable();
        var words = this.model.words;
        var table = document.getElementById(this.model.id);
        for (var i = 0; i < words.length; i++) {
            var wordCol = document.createElement('div');
            wordCol.className = this.COL_CLASS;
            wordCol.innerHTML = words[i];
            if (this.model.errWordsIndexs.indexOf(i) != -1)
                wordCol.style.backgroundColor = 'red';
            else if (i === this.model.currentWordIndex)
                wordCol.style.backgroundColor = 'gray';
            table === null || table === void 0 ? void 0 : table.appendChild(wordCol);
        }
    }
    clearTable() {
        var table = document.getElementById('words-table');
        while (table === null || table === void 0 ? void 0 : table.firstChild) {
            table.removeChild(table.firstChild);
        }
    }
}
