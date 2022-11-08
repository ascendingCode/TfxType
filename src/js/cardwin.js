export class CardWindow {
    static addListItem(text) {
        this.listObjects.push(text);
    }
    static show() {
        var card = document.getElementById(this.cardID);
        if (card === undefined) {
            console.error("Cannot get card window");
            return;
        }
        var cardListBody = document.getElementById(this.cardBodyID);
        for (var i = 0; i < this.listObjects.length; i++) {
            var listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = this.listObjects[i];
            cardListBody === null || cardListBody === void 0 ? void 0 : cardListBody.appendChild(listItem);
        }
        card === null || card === void 0 ? void 0 : card.style.width = '320px';
        card === null || card === void 0 ? void 0 : card.style.height = '320px';
        setTimeout(() => {
            card === null || card === void 0 ? void 0 : card.style.width = 'auto';
            card === null || card === void 0 ? void 0 : card.style.height = 'auto';
        }, 2100);
    }
    static clearCardBody() {
        var cardListBody = document.getElementById(this.cardBodyID);
        while (cardListBody === null || cardListBody === void 0 ? void 0 : cardListBody.firstChild) {
            cardListBody.removeChild(cardListBody.firstChild);
        }
        this.listObjects = [];
    }
    static onSave(callback) {
        var button = document.getElementById('save-btn');
        button === null || button === void 0 ? void 0 : button.addEventListener('click', callback);
    }
    static onReload(callback) {
        var button = document.getElementById('reload-btn');
        button === null || button === void 0 ? void 0 : button.addEventListener('click', callback);
    }
    static hide() {
        var card = document.getElementById(this.cardID);
        card === null || card === void 0 ? void 0 : card.style.width = '0px';
        card === null || card === void 0 ? void 0 : card.style.height = '0px';
    }
}
CardWindow.listObjects = [];
CardWindow.cardID = 'type-result-card';
CardWindow.cardBodyID = 'list-body';
