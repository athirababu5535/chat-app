import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({
  bitRate: 128,
});
export const StartRecording = () => {
  Mp3Recorder.start()
    .then(() => {})
    .catch((e) => {
      console.log(e.message);
    });
};
export const StopRecording = () => {
  Mp3Recorder.stop()
    .getMp3()
    .then(([buffer, blob]) => {
      const file = new File(buffer, `${new Date().getTime()}-voice.mp3`, {
        type: blob.type,
        lastModified: Date.now(),
      });
      console.log(file);
      // setRecordAudio(file);
    })
    .catch((e) => {
      alert("We could not retrieve your message");
      console.log(e);
    });
};
