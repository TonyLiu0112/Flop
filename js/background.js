chrome.runtime.onInstalled.addListener(function () {
    // init cache.
    storage(-500, 3);
});

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     if (tab && tab.url && !tab.url.startsWith("chrome://")
//         && changeInfo && changeInfo.status === 'complete') {
//         execForTouchpad(tabId);
//         execForMouse(tabId);
//     }
// });

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
    // is create new tab.
    execForTouchpad(details.tabId);
    execForMouse(details.tabId);
});

function execForTouchpad(tid) {
    chrome.scripting.executeScript({
        target: {tabId: tid},
        function: function () {
            let step = 0;
            let sliding = -500;

            chrome.storage.sync.get(["sliding_distance"]).then((result) => {
                if (result !== undefined) {
                    sliding = result.sliding_distance;
                }

                window.addEventListener('wheel', function (event) {
                    if (event.deltaX < -20) {
                        step += event.deltaX
                    }

                    if (step < sliding) {
                        event.stopPropagation();
                        event.preventDefault();
                        window.close();
                    }
                });
            });
        }
    });
}

function execForMouse(tid) {
    chrome.scripting.executeScript({
        target: {tabId: tid},
        function: function () {
            let clickNum = 3;
            chrome.storage.sync.get(["click_num"]).then((result) => {
                if (result !== undefined) {
                    clickNum = result.click_num;
                }

                document.addEventListener('mousedown', function (event) {
                    if (event.button === clickNum) {
                        event.stopPropagation();
                        event.preventDefault();
                        setTimeout(function () {
                            window.close();
                        }, 200);
                    }
                });
            });


        }
    });
}

function isMacOs() {
    return navigator.platform.toUpperCase().includes('MAC');
}

function storage(sliding_distance, click_num) {
    chrome.storage.sync
        .set({
            sliding_distance: sliding_distance,
            click_num: click_num
        })
        .then(() => {
            console.log("Value is init!");
        });
}