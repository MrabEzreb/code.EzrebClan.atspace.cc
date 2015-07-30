var loader;
loader = document.getElementsByTagName("head")[0];
function addScript(name) {
    "use strict";
    var srcElem;
    srcElem = document.createElement("script");
    srcElem.setAttribute("src", "blockly/"+name);
    srcElem.setAttribute("type", "text/javascript");
    loader.appendChild(srcElem);
}
function loadScripts() {
    "use strict";
    addScript("blockly_compressed.js");
    addScript("blocks_compressed.js");
    addScript("msg/js/en.js");
}
function addBlocks() {
    var sysoutJson = {
      "id": "sysout",
      "message0": "Text %1",
      "args0": [
        {
          "type": "input_value",
          "name": "text",
          "check": "String"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "",
      "helpUrl": "http://www.example.com/"
    };
    Blockly.Blocks['sysout'] = {
      init: function() {
        this.jsonInit(sysoutJson);
      }
    };
    Blockly.JavaScript['sysout'] = function(block) {
      var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
      // TODO: Assemble JavaScript into code variable.
      var code = 'writeToConsole('+value_text+');';
      return code;
    };
}
loadScripts();
window.addEventListener("load", function() {
    addBlocks();
    var blocklyArea = document.getElementById('blocklyArea');
    var blocklyDiv = document.getElementById('blocklyDiv');
    var workspace = Blockly.inject(blocklyDiv, {toolbox: document.getElementById('toolbox')});
    var onresize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
        var element = blocklyArea;
        var x = 0;
        var y = 0;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        // Position blocklyDiv over blocklyArea.
        blocklyDiv.style.left = x + 'px';
        blocklyDiv.style.top = y + 'px';
        blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
        blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    };
    window.addEventListener('resize', onresize, false);
    onresize();
});