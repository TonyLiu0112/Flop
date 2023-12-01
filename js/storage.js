let saveBtn = document.getElementById("save");
let resetBtn = document.getElementById("reset");

let element_sliding_distance = "sliding_distance"
let element_click_num = "click_num"

saveBtn.onclick = function (el) {
    let sliding_distance = document.getElementById(element_sliding_distance).value;
    let click_num = document.getElementById(element_click_num).value;

    // save to chrome storage.
    storage(sliding_distance, click_num);
};

resetBtn.onclick = function (el) {
    storage(-500, 3);
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

window.onload = function () {
    chrome.storage.sync.get([element_sliding_distance, element_click_num]).then((result) => {
        document.getElementById(element_sliding_distance).value = result.sliding_distance;
        document.getElementById(element_click_num).value = result.click_num;
    });
}