import { CachedSharp, Upload } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import Moment from "react-moment";

function SingleChat({ datas, User1 , videoprogress , progress , preview }) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({behavior : "smooth"});
  }, [datas]);

  return (
    <div className={User1 === datas.from ? "me" : null} ref={scrollRef}>
      <div className="single-chat-container">
        <div className="message-container">
          {datas.msg ? <p>{datas.msg}</p> : null}
          {datas.file.length > 0
            ? datas.file.map((element, i) => (
                <iframe
                  key={i}
                  title="Document"
                  src={element}
                  frameBorder="0"
                  scrolling="none"
                  height="fit-content%"
                  width="100%"
                  overflow="hidden"
                ></iframe>
              ))
            : null}
          {datas?.media
            ? datas.media.map((element, i) => (
                <div key={i} className="image-container">
                  {progress? 
                    progress !== 100 ? 
                      <div className="video-upload">
                        <img src={preview} />
                        <center className="progress"><Upload/> {videoprogress}%</center>
                      </div>
                    :<img src={element} alt="Watsapp-Images" />
                  :null}
                  <img src={element} alt="Watsapp-Images" />
                </div>
              ))
            : null}
          {datas.audio ? (
            <audio controls>
              <source src={datas.audio} />
            </audio>
          ) : null}
          {datas.voiceNote ? (
            <audio controls >
            <source src={datas.voiceNote} />
          </audio>
          ): null}
          {videoprogress ?
            videoprogress !== 100 ?
              <div className="video-upload">
                <video controls></video>
                <center className="progress"><Upload/> {videoprogress}%</center>
              </div>:
                datas.video ? (
                  <video controls style={{width:"100%"}}>
                    <source src={datas.video} />
                  </video>
                ):null
            : datas.video ? (
              <video controls style={{width:"100%"}}>
                <source src={datas.video} />
              </video>)
          :null}
        </div>
        <div className="moment">
          <Moment fromNow>{datas.createdAt.toDate().toDateString()}</Moment>
        </div>
      </div>
    </div>
  );
}

export default SingleChat;
