chrome.runtime.sendMessage({ ready: true });
chrome.runtime.onMessage.addListener(msg => {
    if (msg.streamId) {
        gUM(msg.streamId);
    }
});

function gUM(streamId) {
    navigator.mediaDevices.getUserMedia({
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamId
            }
        }
    }).then(stream => {
        vid.srcObject = stream;
    }).catch(err => {
        console.error(err);
    });
}