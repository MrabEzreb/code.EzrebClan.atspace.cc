var console;
function createConsole() {
    "use strict";
    var lconsole;
    lconsole = document.getElementsByTagName("consoleEl")[0];
    if (lconsole != null) {
        window.alert("happened");
        console = lconsole;
    } else {
        window.alert("happened2");
    }
}
function writeToConsole(str) {
    "use strict";
    var elem;
    elem = document.createElement("p");
    elem.innerHTML = str;
    elem.style.wordWrap = "normal";
    console.appendChild(elem);
}
window.addEventListener("load", createConsole);