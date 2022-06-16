import React from 'react';

function SingleChat({datas,User1}) {

  return (
    <div className={User1 === datas.from ? "me" : null}>
      {datas.file?<a href={datas.file}>
        <div className='single-chat-container'>
          <div className='message-container'>
            {datas.msg ? <p>{datas.msg}</p>:null}
            {datas.media ? <img src={datas.media} alt={datas.msg} />:null}
            {datas.audio ?
            <audio controls>
              <source src={datas.audio} />
            </audio>
            :null}
            {datas.file ?
              <iframe
              src={datas.file}
              frameBorder="0"
              scrolling="none"
              height="fit-content%"
              width="100%"
              overflow= "hidden"
            ></iframe>
            :null}
          </div>
          <div className='moment'>
            <small>loading...</small>
          </div>
        </div>
      </a>
      :
      <div className='single-chat-container'>
        <div className='message-container'>
          {datas.msg ? <p>{datas.msg}</p>:null}
          {datas.media ? <img src={datas.media} alt={datas.msg} />:null}
          {datas.audio ?
          <audio controls>
            <source src={datas.audio} />
          </audio>
          :null}
          {datas.file ?
            <iframe
            src={datas.file}
            frameBorder="0"
            scrolling="none"
            height="fit-content%"
            width="100%"
            overflow= "hidden"
          ></iframe>
          :null}
        </div>
        <div className='moment'>
          <small>loading...</small>
        </div>
      </div>}
    </div>
  )
}

export default SingleChat
