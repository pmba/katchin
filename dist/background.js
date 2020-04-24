chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const { url } = changeInfo
    const urlReg = /^https:\/\/\w+[.]twitch[.]tv\/\w+$/g

    if (url && urlReg.test(url)) {
        chrome.tabs.sendMessage(tabId, { id: 'katchin-load-script' })
    }
})