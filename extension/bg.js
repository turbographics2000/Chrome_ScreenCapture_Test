chrome.runtime.onMessage.addListener((msg, sender, res) => {
    if (msg.ready) {
        chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab'], sender.tab, streamId => {
            chrome.tabs.sendMessage(sender.tab.id, { streamId });
        });
    }
});
