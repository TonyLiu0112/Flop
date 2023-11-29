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
    chrome.tabs.executeScript(details.tabId, {
        code: `
                        window.addEventListener('wheel', function(event) {
                          console.log(event.deltaX);
                          if (event.deltaX < 0) {
                            setTimeout(function() {
                                window.close();
                            }, 150);
                          }
                        });
                      `
    });
}

function execForWindows(details) {
    chrome.tabs.executeScript(details.tabId, {
        code: `
                        document.addEventListener('mousedown', function(event) {
                            if (event.button === 3) {
                                setTimeout(function() {
                                    window.close();
                                }, 150);
                            }
                        });
                      `
    });
}