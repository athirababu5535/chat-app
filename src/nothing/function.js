import MicRecorder from "mic-recorder-to-mp3";
import { useState } from "react";

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
  let Recordfile;
  Mp3Recorder.stop()
    .getMp3()
    .then(([buffer, blob]) => {
      Recordfile = new File(buffer, `${new Date().getTime()}-voice.mp3`, {
        type: blob.type,
        lastModified: Date.now(),
      });
      console.log(Recordfile);
      // setRecordAudio(file);
    })
    .catch((e) => {
      alert("We could not retrieve your message");
      console.log(e);
    });

    return Recordfile;
};
