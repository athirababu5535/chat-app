import React, { useEffect, useRef } from "react";

function SingleChat({ datas, User1 }) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
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
            <audio controls>
            <source src={datas.voiceNote} />
          </audio>
          ): null}
        </div>
        <div className="moment">
          <small>loading...</small>
        </div>
      </div>
    </div>
  );
}

export default SingleChat;
