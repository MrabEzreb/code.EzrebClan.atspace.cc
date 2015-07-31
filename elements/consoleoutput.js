var console, consoleTitle;
function createConsole() {
    "use strict";
    var lconsole;
    lconsole = document.getElementsByTagName("consoleEl")[0];
    if (lconsole !== null) {
        //window.alert("happened");
        console = lconsole;
        lconsole.style.overflowY = "auto";
        consoleTitle = document.createElement("h1");
        consoleTitle.innerHTML = lconsole.getAttribute("title");
        consoleTitle.style.color = "white";
        lconsole.appendChild(consoleTitle);
        var oldHeight = lconsole.style.height;
        lconsole.style.height = "calc("+oldHeight+" - 1em)";
        lconsole.style.top = "1em";
        consoleTitle.style.position = "fixed";
        consoleTitle.style.marginTop = "-0.67em";
        consoleTitle.style.backgroundColor = "black";
        consoleTitle.style.width = "calc("+lconsole.style.width+" - 6px)";
        //consoleInt = document.createElement("iframe");
    }
}
function writeToConsole(str) {
    "use strict";
    var elem;
    elem = document.createElement("p");
    elem.innerHTML = str;
    elem.style.wordWrap = "normal";
    elem.style.color = "white";
    console.appendChild(elem);
    try {
        console.scrollTop = console.scrollHeight;
    } catch(e) {
        var f = document.createElement("input");
        f.setAttribute("type", "text");
        console.appendChild(f);
        f.focus();
        console.removeChild(f);
    }
}
function setConsoleTitle(str) {
    "use strict";
    consoleTitle.innerHTML = str;
}
window.addEventListener("load", createConsole);