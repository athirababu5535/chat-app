import React, { useState } from "react";

// imports from react material icons

import {
  AttachFile,
  AudioFile,
  InsertDriveFile,
  InsertPhoto,
  KeyboardVoice,
  MicOff,
} from "@mui/icons-material";
import { Button } from "@mui/material";

//  import from nothing/function

import { StartRecording, StopRecording } from "../nothing/function";

function Footer({
  msg,
  images,
  audios,
  setMsg,
  handleSubmit,
  setAudio,
  setFile,
  filesUpload,
  setPreview,
  setImage,
  setRecord,
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
          </ul>
          <div className="file-drop">
            <Button>
              <AttachFile
                onClick={handleSelectUl}
                style={{ cursor: "pointer", color: "gray" }}
              />
            </Button>
          </div>
          {images.length > 0 || audios ? (
            images ? (
              <img src={images.name} alt={images.name} />
            ) : (
              <audio controls>
                <source src={audios.name} />
              </audio>
            )
          ) : (
            <input
              type="text"
              placeholder="type message here...."
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
            />
          )}
          {filesUpload.length > 0 ? null : null}
          {msg || audios || images || filesUpload ? (
            <button className="btn">send</button>
          ) : (
            // <Button>
              <>
              <MicOff onClick={StopRecording} />
              <KeyboardVoice onClick={StartRecording} />
              </>
            // </Button>
          )}
        </form>
      </footer>
    </>
  );
}

export default Footer;
