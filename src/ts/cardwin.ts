export class CardWindow{
    private static listObjects: string[] = []
    public static readonly cardID = 'type-result-card'
    public static readonly cardBodyID = 'list-body'

    public static addListItem(text: string){
        this.listObjects.push(text)
    }
    public static show(){
        var card = document.getElementById(this.cardID)
        if(card === undefined){
                console.error("Cannot get card window")
                return
        }
        var cardListBody = document.getElementById(this.cardBodyID)
        
        for(var i = 0; i < this.listObjects.length; i++){
            var listItem: HTMLLIElement = document.createElement('li')
            listItem.className = 'list-group-item'
            listItem.innerHTML = this.listObjects[i]
            cardListBody?.appendChild(listItem)
        }
        card?.style.width = '320px'
        card?.style.height = '320px'

        setTimeout(() => {
            card?.style.width = 'auto'
            card?.style.height = 'auto'
        }, 2100)
    } 
    public static clearCardBody(){
        var cardListBody = document.getElementById(this.cardBodyID)
        while(cardListBody?.firstChild){
            cardListBody.removeChild(cardListBody.firstChild)
        }
        this.listObjects = []
    }  
    public static onSave(callback){
        var button = document.getElementById('save-btn')
        button?.addEventListener('click', callback)
    }
    public static onReload(callback){
        var button = document.getElementById('reload-btn')
        button?.addEventListener('click', callback)
    }
    public static hide(){
        var card = document.getElementById(this.cardID)
        card?.style.width = '0px'
        card?.style.height = '0px'
    }
}