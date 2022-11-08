import { TypeTableController } from "../controller/ttcontroller.js";
import { TypeTable } from "../model/typetable.js";

export class TypeTableView{
    public readonly COL_CLASS: string = 'col-5 col-md-2 m-1'
    constructor(readonly model: TypeTable){}

    public render(){
        this.clearTable()

        var words: string[] = this.model.words
        var table = document.getElementById(this.model.id)
        
        for(var i = 0; i < words.length; i++){
            var wordCol = document.createElement('div')
            wordCol.className = this.COL_CLASS
            wordCol.innerHTML = words[i]

            if(this.model.errWordsIndexs.indexOf(i) != -1)
                wordCol.style.backgroundColor = 'red'
            
            else if(i === this.model.currentWordIndex)
                wordCol.style.backgroundColor = 'gray'

            table?.appendChild(wordCol)
        }
    }
    public clearTable(){
        var table = document.getElementById('words-table')
        while(table?.firstChild){
            table.removeChild(table.firstChild)
        }
    }
}