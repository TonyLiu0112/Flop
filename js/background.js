chrome.runtime.onInstalled.addListener(function () {
    // init cache.
    storage(-500, 3);
});

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {

    const dynamicKey = String(details.tabId);
    chrome.storage.sync.get([dynamicKey]).then((result) => {

        if (result === undefined || result[dynamicKey] === undefined) {

            const keyValueObject = {};
            keyValueObject[dynamicKey] = details.tabId;
            chrome.storage.sync.set(keyValueObject, function () {
            });

            injectScript4Touchpad(details.tabId);
            injectScript4Mouse(details.tabId);
        }
    })
});

function injectScript4Touchpad(tid) {
    chrome.scripting.executeScript({
        target: {tabId: tid},
        function: function () {
            let step = 0;
            let sliding = -500;
            let stepY = 0;
            let slidingY = -100;

            chrome.storage.sync.get(["sliding_distance"]).then((result) => {
                if (result !== undefined) {
                    sliding = result.sliding_distance;
                }

                window.addEventListener('wheel', function (event) {
                    stepY += event.deltaY;

                    if (event.deltaX < -20) {
                        step += event.deltaX
                    }

                    if (stepY < slidingY) {
                        stepY = 0;
                        step = 0;
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

function injectScript4Mouse(tid) {
    chrome.scripting.executeScript({
        args: [tid],
        target: {tabId: tid},
        function: function (tabId) {
            let clickNum = 3;
            chrome.storage.sync.get(["click_num"]).then((result) => {
                if (result !== undefined) {
                    clickNum = result.click_num;
                }
                document.addEventListener('mousedown', function (event) {
                    if (event.button === clickNum) {
                        event.stopPropagation();
                        event.preventDefault();
                        chrome.storage.sync.get(String(tabId)).then((result) => {
                            if (result !== undefined && result[String(tabId)] !== undefined) {
                                chrome.storage.sync.remove(String(tabId), function () {
                                });
                            }
                        })

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