import React, { useState } from "react";

// imports from react material icons

import {
  AttachFile,
  AudioFile,
  Chat,
  InsertDriveFile,
  InsertPhoto,
  KeyboardVoice,
  MicOff,
  VideoFile,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";



function Footer({
  User1,
  User2,
  id,
  msg,
  images,
  audios,
  video,
  setMsg,
  handleSubmit,
  setAudio,
  setVideo,
  setFile,
  filesUpload,
  recordAudio,
  setPreview,
  setImage,
  StartRecording,
  StopRecording,
}) {

  // for set the dropdown of attachment
  const [uldrop, setUl] = useState(false);
  const handleSelectUl = () => {
    setUl(!uldrop);
  };

  // to set image and file array's

  const handleChange = (e) => {
    if (e.target.accept === "image/*") {
      for (let i = 0; i < e.target.files.length; i++) {
        const newImage = e.target.files[i];
        newImage["id"] = Math.random();
        setImage((prevState) => [...prevState, newImage]);
        setPreview((prevState) => [
          ...prevState,
          URL.createObjectURL(newImage),
        ]);
      }
    } else if(e.target.accept ===".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
      for (let i = 0; i < e.target.files.length; i++) {
        const newFile = e.target.files[i];
        newFile["id"] = Math.random();
        setFile((prevState) => [...prevState, newFile]);
        setPreview((prevState) => [...prevState, URL.createObjectURL(newFile)]);
      }
    }
  };
  const handleTypeChange = async (e) => {
    setMsg(e.target.value);
    await updateDoc(doc(db,"lastmessage" ,id) , { isTyping:true , from:User1 , to:User2 });
  }
  const [voice,setVoice] = useState(true);
  return (
    <>
      <footer>
        <form onSubmit={handleSubmit}>
          <ul className={uldrop ? "ul" : null} style={{ display: "none" }}>
            <li>
              <Button onClick={handleSelectUl}>
                <label htmlFor="uploadimage">
                  <InsertPhoto style={{ color: "gray" }} />
                </label>
              </Button>
              <input
                onChange={handleChange}
                type="file"
                id="uploadimage"
                accept="image/*"
                style={{ display: "none" }}
                multiple
              />
            </li>
            <li>
              <Button onClick={handleSelectUl}>
                <label htmlFor="fileupload">
                  <InsertDriveFile style={{ color: "gray" }} />
                </label>
              </Button>
              <input
                onChange={handleChange}
                type="file"
                id="fileupload"
                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                style={{ display: "none" }}
                multiple
              />
            </li>
            <li>
              <Button onClick={handleSelectUl}>
                <label htmlFor="audioupload">
                  <AudioFile style={{ color: "gray" }} />
                </label>
              </Button>
              <input
                onChange={(e) => setAudio(e.target.files[0])}
                type="file"
                id="audioupload"
                accept="audio/*"
                style={{ display: "none" }}
              />
            </li>
            <li>
              <Button onClick={handleSelectUl}>
                <label htmlFor="videoupload">
                  <VideoFile style={{color:"gray"}} />
                </label>
              </Button>
              <input
                onChange={(e) => setVideo(e.target.files[0])}
                type="file"
                id="videoupload"
                accept="video/*"
                style={{ display: "none" }}
              />
            </li>
          </ul>
          <div className="file-drop">
            <Button>
              <AttachFile
                onClick={handleSelectUl}
                style={{ cursor: "pointer", color: "gray" }}
              />
            </Button>
          </div>
          {images.length > 0 || audios ||video ? (
            null
          ) : (
            <input
              type="text"
              placeholder="type message here...."
              value={msg}
              onChange={handleTypeChange}
            />
          )}
          {filesUpload.length > 0 ? null : null}
          {msg || audios || images || filesUpload || recordAudio || video ? (
            <button className="btn">send</button>
          ) : (
            <Button onClick={()=>setVoice(!voice)}>
              {voice ? 
              <KeyboardVoice onClick={StartRecording} />
              :
              <MicOff onClick={StopRecording} />}
            </Button>
          )}
        </form>
      </footer>
    </>
  );
}

export default Footer;
