import { App } from "./app.js";
import { CardWindow } from "./cardwin.js";
import { TypeTableController } from "./controller/ttcontroller.js";
import { TypeTable } from "./model/typetable.js";
import { TypeTableView } from "./view/ttview.js";
if (localStorage.length != 0) {
    var header = getEmptyHeader();
    var elements = [];
    for (var i = 0; i < 3; i++) {
        var element = document.createElement('div');
        element.className = 'col-4';
        elements.push(element);
    }
    elements[0].innerHTML = `Writed words: ${localStorage.getItem('writed-words')}`;
    elements[1].innerHTML = `Errors: ${localStorage.getItem('writed-with-errors')}`;
    elements[2].innerHTML = `Without errors: ${localStorage.getItem('writed-without-error')}`;
    elements.forEach((e) => {
        header === null || header === void 0 ? void 0 : header.appendChild(e);
    });
}
var words = [
    "require", "spawn", "London", "machine",
    "go", 'througth', 'why', "let's",
    "can't", "by", "want", "need",
    'ability', 'able', 'about', 'above',
    'accept', 'according', 'account',
    'central', 'century', 'certain', 'certainly',
    "starter", "big", "scala", "car",
    "bus", "mouse", "keyboard", "magic",
    'the', 'be', 'to', 'of', 'and',
    'across', 'act', 'action', 'activity',
    'a', 'in', 'that', 'have', 'I',
    'actually', 'add', 'case',
    'catch', 'cause', 'cell', 'center',
    'chair', 'challenge', 'chance', 'change'
];
var model = new TypeTable('words-table');
var view = new TypeTableView(model);
var controller = new TypeTableController(model, view, words);
var app = new App(controller);
app.initEvents();
app.renderTable();
// app.startSession(5)
// setTimeout(() => {
//     writeSessionResult(app)
//     CardWindow.show()
// }, 7000)
var isInputDisabled = false;
var userInput = document.getElementById('user-input');
userInput === null || userInput === void 0 ? void 0 : userInput.addEventListener('input', () => {
    var _a;
    if (isInputDisabled)
        return;
    isInputDisabled = true;
    var typeTime = (_a = document.getElementById('type-time')) === null || _a === void 0 ? void 0 : _a.value;
    app.startSession(parseInt(typeTime));
    setTimeout(() => {
        writeSessionResult(app);
        CardWindow.show();
    }, (parseInt(typeTime) + 1) * 1000);
});
CardWindow.onSave(() => {
    if (app.sessionResult != undefined) {
        localStorage.setItem('writed-words', `${app.sessionResult.allWritedWords}`);
        localStorage.setItem('writed-with-errors', `${app.sessionResult.wordsWithError}`);
        localStorage.setItem('writed-without-error', `${app.sessionResult.withoutError}`);
        console.log('Saved.');
        var header = getEmptyHeader();
        var message = document.createElement('div');
        message.className = 'col-12 text-center';
        message.innerHTML = `Result saved. Please restart the page.`;
        header === null || header === void 0 ? void 0 : header.appendChild(message);
        return;
    }
    console.error('Cannot save data. Session result is empty.');
});
CardWindow.onReload(() => {
    app.rebootTable();
    app.renderTable();
    var timer = document.getElementById(app.timerDataID);
    timer === null || timer === void 0 ? void 0 : timer.innerHTML = '0 s';
    userInput === null || userInput === void 0 ? void 0 : userInput.value = '';
    isInputDisabled = false;
    CardWindow.hide();
});
function getEmptyHeader() {
    var header = document.getElementById('header-data');
    while (header === null || header === void 0 ? void 0 : header.firstChild) {
        header.removeChild(header.firstChild);
    }
    return header;
}
function writeSessionResult(app) {
    CardWindow.clearCardBody();
    if (app.sessionResult != undefined) {
        CardWindow.addListItem(`Total writed words: ${app.sessionResult.allWritedWords}`);
        CardWindow.addListItem(`Writed with errors: ${app.sessionResult.wordsWithError}`);
        CardWindow.addListItem(`Writed without errors: ${app.sessionResult.withoutError}`);
    }
}
