let changeColor = document.getElementById("changeColor");

changeColor.onclick = function (el) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code: 'window.history.back();',
        });
    });
};