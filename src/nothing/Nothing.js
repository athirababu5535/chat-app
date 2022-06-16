import React, { useState } from 'react'


import { KeyboardVoice, MicOff } from '@mui/icons-material'
import { Button } from '@mui/material';

import MicRecorder from "mic-recorder-to-mp3";

function Nothing() {
    // const MicRecorder = require('mic-recorder-to-mp3');
    const [audio,setRecordAudio] = useState();
    const Mp3Recorder = new MicRecorder({
        bitRate: 128,
    });
    const StartRecording = () => {
        Mp3Recorder.start()
            .then(() => {})
            .catch((e) => {
                console.log(e.message);
            });
    };
    const StopRecording =async () => {
        Mp3Recorder.stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const file = new File(buffer, `${new Date().getTime()}-voice.mp3`, {
                    type: blob.type,
                    lastModified: Date.now(),
                });
                console.log(file);
                setRecordAudio(file)
            })
            .catch((e) => {
                alert("We could not retrieve your message");
                console.log(e);
            });
    };
  return (
    <div>
      <Button >
          <MicOff onClick={StopRecording}/>
          <KeyboardVoice onClick={StartRecording}/>
      </Button>
      {audio?<audio src={audio} controls />:null}
    </div>
  )
}

export default Nothing
