import React, { useState } from 'react';
import MicRecorder from "mic-recorder-to-mp3";
// imports from react material icons

import { AttachFile, AudioFile, InsertDriveFile, InsertPhoto, KeyboardVoice, MicOff, NoDrinks } from '@mui/icons-material';
import { Button } from '@mui/material';
import Nothing from '../nothing/Nothing';

function Footer({msg,images,setMsg,handleSubmit,setAudio,setFile,files,setImage,handlePreview}) {

  // for set the dropdown of attachment
  const [uldrop,setUl] = useState(false);
  const handleSelectUl = () => {
      setUl(!uldrop);
  }
  
  return (
    <footer>
      <form onSubmit={handleSubmit}>
        <ul className={uldrop?"ul":null} style={{display:"none"}}>
          <li>
              <Button onClick={handleSelectUl}>
                  <label htmlFor='uploadimage'>
                      <InsertPhoto style={{color:"gray"}} />
                  </label>
              </Button>
              <input onChange={handlePreview} type="file" accept='image/*' id='uploadimage' style={{display:"none"}} />
          </li>
          <li>
              <Button onClick={handleSelectUl}>
                  <label htmlFor='fileupload'>
                      <InsertDriveFile style={{color:"gray"}} />
                  </label>
              </Button>
              <input onChange={(e)=>(setFile(e.target.files[0]))} type="file" id='fileupload' style={{display:"none"}} accept='.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' />
          </li>
          <li>
              <Button onClick={handleSelectUl}>
                  <label htmlFor='audioupload'>
                      <AudioFile style={{color:"gray"}} />
                  </label>
              </Button>
              <input onChange={(e)=>(setAudio(e.target.files[0]))} type="file" id='audioupload' accept='audio/*' style={{display:"none"}} />
          </li>
        </ul>
        <div className='file-drop'>
          <Button>
              <AttachFile onClick={handleSelectUl} style={{cursor:"pointer"}} style={{color:"gray"}} />
          </Button>
        </div>
        <input type="file" id="file" style={{display:"none"}} />
        {images ? <img src={images.name} />:<input type="text" placeholder='type message here....' value={msg} onChange={(e)=>{setMsg(e.target.value)}} />}
        {msg?
          <button className='btn'>send</button>
        :
          <Nothing />
        }
          {/* <button className='btn'>send</button> */}

      </form>
    </footer>
  )
}

export default Footer
