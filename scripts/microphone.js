export function getLocalStream() {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
        window.localStream = stream;
        window.localAudio.srcObject = stream;
        window.localAudio.autoplay = true;
    }).catch((err) => {
        console.error(`you got an error: ${err}`)
    });
}

/*
navigator.permissions.query({ name: 'microphone' }).then((result) => {
 if (result.state === 'granted') {
   startMicrophone();
 } else if (result.state === 'prompt') {
   getLocalStream();
 }
   changePermissionPrompt();
});
*/