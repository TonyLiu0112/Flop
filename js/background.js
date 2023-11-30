chrome.runtime.onInstalled.addListener(function () {
    console.log("success!")
})

function isMacOs() {
    return navigator.platform.toUpperCase().includes('MAC');
}

chrome.webNavigation.onCreatedNavigationTarget.addListener(function (details) {
    // is create new tab.
    if (details.sourceTabId && details.tabId) {
        if (isMacOs()) {
            execForMac(details);
        } else {
            execForWindows(details);
        }
    }
});

function execForMac(details) {
    chrome.scripting.executeScript({
        target: {tabId: details.tabId},
        function: function () {
            let i = 0;
            window.addEventListener('wheel', function (event) {
                if (event.deltaX < -20) {
                    i += event.deltaX
                }

                if (i < -500) {
                    event.stopPropagation();
                    event.preventDefault();
                    window.close();
                }
            });
        }
    });
}

function execForWindows(details) {
    chrome.scripting.executeScript({
        target: {tabId: details.tabId},
        function: function () {
            document.addEventListener('mousedown', function (event) {
                if (event.button === 3) {
                    event.stopPropagation();
                    event.preventDefault();
                    setTimeout(function () {
                        window.close();
                    }, 200);
                }
            });
        }
    });
}