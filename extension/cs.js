chrome.runtime.sendMessage({ ready: true });
chrome.runtime.onMessage.addListener(msg => {
    if (msg.streamId) {
        gUM(msg.streamId);
    }
});

function gUM(streamId) {
    console.log(`streamId=${streamId}`);
    navigator.mediaDevices.getUserMedia({
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamId
            }
        }
    }).then(stream => {
        vid.srcObject = stream;
        console.log(`stream.getConstraints().deviceId=${stream.getVideoTracks()[0].getConstraints().deviceId}`);
    }).catch(err => {
        console.error(err);
    });
}