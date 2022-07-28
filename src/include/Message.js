import { Edit, KeyboardArrowRight, KeyboardVoice, Upload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
// import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";
import { db } from "../firebase";

function Message({text,imgs,voice,setA,setPreviewUrl,previewUrl,setImg,setText,id,handleSubmit}) {

  const [file, setFile] = useState();
  const filePickeref = useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    },[file])
    console.log(imgs);

    function pickerHandler(event){
        let pickedFile;
        if(event.target.files && event.target.files.length == 1){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            }
    };
    function pickedImageHandler(){
        filePickeref.current.click();
    }
    const handleChange = async (e) => {
        setText(e.target.value);
        await updateDoc(doc(db, 'lastmessage' , id) , { isTyping : true});
    }
    if(previewUrl){
        setImg(file);
    }

    const [recording,setRecording] = useState(true);
    // const { startRecording,stopRecording,mediaBlobUrl } = useReactMediaRecorder({ audio: true });
    // const recordAudio = () => {
    //     if (recording) {
    //         setRecording(false);
    //     } else {
    //         setRecording(true);
    //         setVoice(mediaBlobUrl);
    //         console.log(mediaBlobUrl);
    //     }
    // };
  return (
    <>
        <form className="form-control center" onSubmit={handleSubmit}>
            <input id={id} ref={filePickeref} onChange={pickerHandler} style={{display:"none"}} type="file" accept="image/*" />
            <div className="image-upload">
                <div className="image-upload-preview">
                    {!previewUrl && 
                        <div className="center">
                            <Button>
                                <Upload style={{cursor:"pointer"}} for="upload" onClick={pickedImageHandler} />
                            </Button>
                            <div className="input-fiefld">
                                <div className="container">
                                    {voice ? 
                                        <audio controls autoPlay className="audio">
                                            {/* <source src={mediaBlobUrl}/> */}
                                        </audio>
                                        :<input className="text-message-input"
                                            type="text"
                                            placeholder="Enter Message"
                                            value={text}
                                            required
                                            onChange={handleChange}
                                    />}
                                    <div className="audio-container">

                                        { text || voice?
                                            <div className="btn-container">
                                                <button className="btn send">send</button>
                                            </div>
                                            :
                                            <>
                                                {/* <Button onClick={recordAudio}>
                                                    {recording?
                                                        <Button>
                                                            <KeyboardVoice onClick={startRecording} />
                                                        </Button>
                                                    :
                                                        <Button>
                                                            <KeyboardVoice onClick={stopRecording} style={{color:"red"}} />
                                                        </Button>
                                                    }
                                                </Button> */}
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </form>
        {previewUrl?
            <div className="preview-overlay">
                <div className="preview">
                    {previewUrl && 
                        <div className="preview-image">
                            <img className="image" src={previewUrl} alt="review" />
                        </div>}
                    {previewUrl && (
                        <div className="center-preview">
                            <Button className="edit" style={{color:"black"}} onClick={pickedImageHandler}>
                                <Edit className="icon"></Edit>
                            </Button>
                            <input className="text-message-input"
                                                    type="text"
                                                    placeholder="Enter Message"
                                                    value={text}
                                                    onChange={handleChange}
                                                    required
                                                />
                            <Button className="next" style={{color:"black"}}  onClick={handleSubmit}>
                                <KeyboardArrowRight></KeyboardArrowRight>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        :null}
    </>
  );
}

export default Message;
