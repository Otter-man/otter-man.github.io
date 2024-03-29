var keystrokes = [];
var keystrokesCode = [];
var correctShortcut = document.getElementById("shortcut").textContent;
var correctShortcutArr = correctShortcut.split(/(?:\b ?\+ ?| )/).map(function (item) {
    return item.trim().toLowerCase();
}).sort();
var correctShortcutStr = correctShortcutArr.toString().toLowerCase()

// var contains all the keys that are modified when you press shift together.
var doubleKeys = {
    'Backquote': ['~', '`'], 'Digit1': ['1', '!'], 'Digit2': ['2', '@'],
    'Digit3': ['3', '#'], 'Digit4': ['4', '$'], 'Digit5': ['5', '%'],
    'Digit6': ['6', '^'], 'Digit7': ['7', "&"], 'Digit8': ['8', '*'],
    'Digit9': ['9', '('], 'Digit0': ['0', ')'], 'Minus': ['-', '_'],
    'Equal': ['=', '+'], 'Backslash': ['\\', '|'], 'BracketLeft': ['[', '{'],
    'BracketRight': [']', '}'], 'Quote': ["'", '"'], 'Semicolon': [';', ':'],
    'Comma': [',', '<'], 'Period': [".", '>'], 'Slash': ['/', '?']
};

$('#shortcut').html("press shortcut");
document.getElementById("shortcut").style.color = "grey";
if (window.SwitcherListener == undefined) {
    // prevent starting second instances of event listener in the
    // same window with this switcher
    window.SwitcherListener = true
    $(document).keydown(function (event) {

        if (keystrokes.length < correctShortcutArr.length) {
            if (event.keyCode == 32) {
                event.preventDefault();
                keystrokes.push(event.code);
                keystrokesCode.push(event.code);
            }
            else if (event.code.includes('Meta')) {
                event.preventDefault();
                keystrokes.push('cmd');
                keystrokesCode.push(event.code);
            }
            else {
                event.preventDefault();
                keystrokes.push(event.key);
                keystrokesCode.push(event.code);
            }
        }

        var keystrokesSorted = keystrokes.slice()
        var keystrokesSortedAlt = keystrokesSorted.slice()

        // check if the pressed key can be modified by shift, if yes make two
        // different arrays to keep both versions for comparison with the answer
        // shortcut 
        for (i = 0; i < keystrokesCode.length; i++) {
            if (doubleKeys[keystrokesCode[i]] !== undefined) {
                keystrokesSorted[i] = doubleKeys[keystrokesCode[i]][0];
                keystrokesSortedAlt[i] = doubleKeys[keystrokesCode[i]][1];
            }
        }

        keystrokesSorted = keystrokesSorted.map(function (item) {
            return item.trim().toLowerCase();
        }).sort();
        keystrokesSortedAlt = keystrokesSortedAlt.sort().map(function (item) {
            return item.trim().toLowerCase();
        }).sort();



        if (keystrokesSorted.toString().toLowerCase() == correctShortcutStr || keystrokesSortedAlt.toString().toLowerCase() == correctShortcutStr) {
            $('#shortcut').html(correctShortcut);
            document.getElementById("shortcut").style.color = "green";
            event.preventDefault();
        }
        else if (keystrokes.length == correctShortcutArr.length) {
            document.getElementById("shortcut").style.color = "red";
            $('#shortcut').html(keystrokes.join("+"));
            event.preventDefault();
        };

    })
};
