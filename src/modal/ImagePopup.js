// import Mic

// // const MicRecorder = require('mic-recorder-to-mp3');

//     const recorder = new MicRecorder({
//       bitRate: 128
//     });

//     recorder.start().then(() => {
//     }).catch((e) => {
//     console.error(e);
//     });

// recorder
// .stop()
// .getMp3().then(([buffer, blob]) => {
//   const file = new File(buffer, 'me-at-thevoice.mp3', {
//     type: blob.type,
//     lastModified: Date.now()
//   });

//   const player = new Audio(URL.createObjectURL(file));
//   player.play();

// }).catch((e) => {
//   alert('We could not retrieve your message');
//   console.log(e);
// });