chrome.runtime.onInstalled.addListener(function () {
    console.log("插件被安装咯")
})

// chrome.webNavigation.onCommitted.addListener(function(details) {
//     console.log("hahahahah ======> " + details.transitionType)
//     if (details.transitionType === 'backward') {
//         // 后退操作发生，执行你的逻辑
//         console.log("后退操作发生");
//     }
// });

// chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
//     // details 表示导航事件的详细信息
//     console.log("历史状态已更新", details);
//
//     // 在这里可以执行你的逻辑，判断是否为回退操作
//     if (details.transitionType === 'auto_subframe' && details.source.url === details.url) {
//         // 这表示发生了回退操作
//         console.log("回退操作发生");
//     }
// });

// chrome.webNavigation.onCompleted.addListener(function(details) {
//     // 使用chrome.tabs来获取当前标签页信息
//     chrome.tabs.get(details.tabId, function(tab) {
//         // 判断是否为回退操作
//         if (tab && tab.status === 'complete' && details.transitionType === 'auto_subframe' && details.url === tab.url) {
//             // 回退操作发生
//             console.log("回退操作发生");
//         }
//     });
// });

chrome.webNavigation.onCreatedNavigationTarget.addListener(function (details) {
    // 确保是新标签页的创建
    if (details.sourceTabId && details.tabId) {
        // 注入脚本来绑定滚轮左滑事件
        chrome.tabs.executeScript(details.tabId, {
            code: `
        window.addEventListener('wheel', function(event) {
          if (event.deltaX < 0) {
            // 滚轮左滑事件发生，执行你的逻辑
            console.log("滚轮左滑事件发生");
          }
        });
      `
        });
    }
});