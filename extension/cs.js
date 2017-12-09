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
            },
            width: { exact: 1280 },
            height: { exact: 720 }
        }
    }).then(stream => {
        vid.srcObject = stream;
        vid.onloadedmetadata = _ => {
            document.title = `${vid.videoWidth}x${vid.videoHeight}`;
        }
    }).catch(err => {
        console.error(err);
    });
}