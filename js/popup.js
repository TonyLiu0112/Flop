let saveBtn = document.getElementById("save");
let resetBtn = document.getElementById("reset");

let element_sliding_distance = "sliding_distance"
let element_click_num = "click_num"

saveBtn.onclick = function (el) {
    let sliding_distance = document.getElementById(element_sliding_distance).value;
    let click_num = document.getElementById(element_click_num).value;

    // check input value is number
    if (!isNegativeNumber(sliding_distance)) {
        alert("Touchpad must be a negative number");
        return;
    }

    // check input value is number
    if (!isNumber(click_num)) {
        alert("Mouse must be a number");
        return;
    }

    // save to chrome storage.
    storage(parseFloat(sliding_distance), parseFloat(click_num));

    alert("Success!")
};

resetBtn.onclick = function (el) {
    storage(-500, 3);
    alert("Success!")
}

function storage(sliding_distance, click_num) {
    chrome.storage.sync
        .set({
            sliding_distance: sliding_distance,
            click_num: click_num
        })
        .then(() => {
            console.log("Value is set");
        });
}

function isNegativeNumber(value) {
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue < 0;
}

function isNumber(value) {
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= 0;
}

window.onload = function () {
    chrome.storage.sync.get([element_sliding_distance, element_click_num]).then((result) => {
        document.getElementById(element_sliding_distance).value = result.sliding_distance;
        document.getElementById(element_click_num).value = result.click_num;
    });
}