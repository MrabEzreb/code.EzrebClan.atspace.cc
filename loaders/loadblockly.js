var loader;
loader = document.getElementsByTagName("head")[0];
var blocklyLoaded = false;
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
    //addScript("blockly_compressed.js");
    addScript("blocks_compressed.js");
    addScript("javascript_compressed.js");
    addScript("msg/js/en.js");
    addScript("acorn_interpreter.js");
    //addScript("generators/javascript/ezrebcode.js");
}
loadScripts();
blocklyLoaded = true;
function addBlocks() {
    var sysoutJson = {
      "id": "sysout",
      "message0": "Print To Console %1 Text %2",
      "args0": [
        {
          "type": "input_dummy",
          "align": "CENTRE"
        },
        {
          "type": "input_value",
          "name": "text",
          "check": "String",
          "align": "RIGHT"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 160,
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
      var code = 'writeToConsole(\"'+value_text.slice(value_text.indexOf("(")+1, value_text.lastIndexOf(")"))+'\");';
      return code;
    };
    var onRunJSON = {
      "id": "runevent",
      "message0": "Event %1 On Run %2",
      "args0": [
        {
          "type": "input_dummy"
        },
        {
          "type": "input_statement",
          "name": "Code"
        }
      ],
      "inputsInline": false,
      "colour": 120,
      "tooltip": "",
      "helpUrl": "http://www.example.com/"
    };
    Blockly.Blocks['runevent'] = {
      init: function() {
        this.jsonInit(onRunJSON);
      }
    };
    Blockly.JavaScript['runevent'] = function(block) {
      var statements_code = Blockly.JavaScript.statementToCode(block, 'Code');
      var code = 'function runEvent() {eval(\''+statements_code.replace(/'/g, "\\\'").replace(/"/g, "\\\"")+'\');}\nrunEvent();';
      return code;
    };
    var stringJSON = {
      "id": "string",
      "message0": "\" %1 \"",
      "args0": [
        {
          "type": "field_input",
          "name": "NAME",
          "text": ""
        }
      ],
      "output": "String",
      "colour": 160,
      "tooltip": "",
      "helpUrl": "http://www.example.com/"
    };
    Blockly.Blocks['string'] = {
      init: function() {
        this.jsonInit(stringJSON);
      }
    };
    Blockly.JavaScript['string'] = function(block) {
      var text_name = block.getFieldValue('NAME');
      var code = text_name;
      return [code, Blockly.JavaScript.ORDER_NONE];
    };
}
function runCode() {
    var code = Blockly.JavaScript.workspaceToCode(window.workspace);
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}
window.addEventListener("load", function() {
    var blocklyArea = document.getElementById('blocklyArea');
    var blocklyDiv = document.getElementById('blocklyDiv');
    addBlocks();
    var workspace = Blockly.inject(blocklyDiv, {toolbox: document.getElementById('toolbox')});
    window.workspace = workspace;
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