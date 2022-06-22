import React, { useEffect, useState } from "react";

// import from mice recorder

// import MicRecorder from "mic-recorder-to-mp3";

// import from material icon

import { Avatar } from "@mui/material";

// imports from firebase
import { db, storage } from "../firebase";
import {
  Timestamp,
  collection,
  setDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// imports from user

import SingleChat from "./SingleChat";
import Footer from "./Footer";

// slickk imports

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function ChatPage({ chat, id , User1, User2 }) {

  // useEffect to set avatar
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const [data, setData] = useState("");
  const msgRef = collection(db, "messages", id, "chat");
  const q = query(msgRef, orderBy("createdAt", "asc"));
  onSnapshot(q, (querySnapshot) => {
    let msgs = [];
    querySnapshot.forEach((doc) => {
      msgs.push(doc.data());
    });
    setData(msgs);
  });

  //const to set sending items and set preview state

  const [images, setImage] = useState("");
  const [files, setFile] = useState("");
  const [audios, setAudio] = useState("");
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const id2 =
    User1 > User2
      ? `${User1 + Timestamp.fromDate(new Date())}`
      : `${User2 + Timestamp.fromDate(new Date())}`;

    let iurl=[];
    let furl=[];
    let aurl;
    let vurl;
    setMsg("");
    setImage("");
    setFile("");
    setAudio("");
    setPreview("");
    if (images) {
      console.log("success");
      images.map(async (file) => {
        const imageRef = ref(
          storage,
          `images/${new Date().getTime()} - ${file.name}`
        );
        const snap = await uploadBytes(imageRef, file);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        iurl.push(dlUrl);
        await updateDoc(doc(db,`messages/${id}`,"chat",id2),{
          media:iurl,
        });
        await updateDoc(doc(db,"lastmessage",id),{
          media:iurl,
        });
      })
    }
    if (files) {
      console.log("success");
      console.log(files);
      files.map(async (element)=>{
        const fileRref = ref(
          storage,
          `files/${new Date().getTime()} - ${element.name}`
        );
        const snap = await uploadBytes(fileRref, element);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        furl.push(dlUrl);
        await updateDoc(doc(db,`messages/${id}`,"chat",id2),{
          file:furl,
        });
        await updateDoc(doc(db,"lastmessage",id),{
          file:furl,
        });
      })
    }
    if (audios) {
      console.log("success");
      const audioRef = ref(
        storage,
        `Audios/${new Date().getTime()} - ${audios.name}`
      );
      const snap = await uploadBytes(audioRef, audios);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      aurl = dlUrl;
    }
    await setDoc(doc(db, `messages/${id}/chat`,id2), {
      msg,
      from: User1,
      to: User2,
      createdAt: Timestamp.fromDate(new Date()),
      media: iurl || "",
      file: furl || "",
      audio: aurl || "",
      voiceNote: vurl || "",
    });
    
    await setDoc(doc(db, "lastmessage", id), {
      createdAt: Timestamp.fromDate(new Date()),
      msg,
      from: User1,
      to: User2,
      media: iurl || "",
      file: furl || "",
      audio: aurl || "",
      voiceNote: vurl || "",
    });
  };


  const handleDelete = async (e) => {}

  var Settings = {
    dots: false,
    infinite: false,
    speed: 700,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return chat ? (
    <>
      <div className="chat">
        <div className="message-head">
          <div className="avatar-container-chat">
            <Avatar
              src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="userinfo-container">
            <h1>{chat.name}</h1>
            <p className={chat.isOnline ? "online" : "offline"}>
              {chat.isOnline ? "online" : "offline"}
            </p>
          </div>
        </div>
        <div className="messages">
          {data
            ? data.map((datas, i) => (
                <SingleChat key={i} datas={datas} User1={User1} />
              ))
            : null}
        </div>
        <div className="chat-footer">
          <Footer
            msg={msg}
            images={images}
            audios={audios}
            setImage={setImage}
            setAudio={setAudio}
            setFile={setFile}
            filesUpload={files}
            setMsg={setMsg}
            handleSubmit={handleSubmit}
            setPreview={setPreview}
          />
        </div>
        {images.length>0 ? (
          <div className="preview">
            <div className="preview-container">
              <Slider {...Settings}>
                {preview.map((element,i)=>(
                  <div className="prevew-image-slick" key={i}>
                    <img src={element} alt="previewImage" className="previewImage" />
                    <div className="prevew-remove">
                      <button className="btn" onClick={handleDelete}>Remove</button>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ) : null}
        {files.length>0?(<div className="preview">
            <div className="preview-container">
              <Slider {...Settings}>
                {preview.map((element,i)=>(
                  <div className="prevew-image-slick" key={i}>
                    <iframe
                      className="previewFile"
                      src={element}
                      frameBorder="0"
                      scrolling="none"
                      height="100%"
                      width="100%"
                      overflow="hidden"
                    ></iframe>
                    <div className="prevew-remove">
                      <button className="btn" onClick={handleDelete}>Remove</button>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>):null}
      </div>
    </>
  ) : (
    <h1 className="chat-h1">Select a user to start a chat.....</h1>
  );
}

export default ChatPage;
