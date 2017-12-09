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
            width: { min: 1280, max: 1920 },
            height: { min: 720, max: 1080 }
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