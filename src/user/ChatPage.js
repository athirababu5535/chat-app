import React, { useEffect, useState } from 'react';

// import from mice recorder

import MicRecorder from "mic-recorder-to-mp3";


// import from material icon

import { Avatar } from '@mui/material';


// imports from firebase
import { db, storage } from '../firebase';
import { addDoc, Timestamp, collection, setDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// imports from user

import SingleChat from './SingleChat';
import Footer from './Footer';


function ChatPage({chat,id,User1,User2}){

    // useEffect to set avatar
    const [seed,setSeed] = useState("");
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[]);


    const [data,setData] = useState("");
    const msgRef = collection(db , "messages" , id , "chat");
    const q = query(msgRef , orderBy("createdAt" , "asc"));

    onSnapshot(q , querySnapshot => {
        let msgs = [];
        querySnapshot.forEach(doc =>{
            msgs.push(doc.data())
        });
        setData(msgs);
    })

    //const to set sending items 

    const [images,setImage] = useState("");
    const [files,setFile] = useState("");
    const [audios,setAudio] = useState("");
    const [msg,setMsg] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();

        let iurl;
        let furl;
        let aurl;
        let vurl;
        if (images) {
            console.log("success");
            const imgRef = ref(storage , `images/${new Date().getTime()} - ${images.name}`);
            const snap = await uploadBytes(imgRef, images);
            const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
            iurl = dlUrl;
        }
        if (files) {
            console.log("success");
            const fileRref = ref(storage , `files/${new Date().getTime()} - ${files.name}`);
            const snap = await uploadBytes(fileRref, files);
            const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
            furl = dlUrl;
        }
        if (audios) {
            console.log("success");
            const audioRef = ref(storage , `Audios/${new Date().getTime()} - ${audios.name}`);
            const snap = await uploadBytes(audioRef, audios);
            const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
            aurl = dlUrl;
        }
        await addDoc(collection(db,"messages",id,"chat"),{
            msg,
            from:User1,
            to:User2,
            createdAt:Timestamp.fromDate(new Date()),
            media:iurl || "",
            file:furl || "",
            audio:aurl || "",
            voiceNote:vurl || "",
        })
        await setDoc(doc(db,"lastmessage",id),{
            createdAt:Timestamp.fromDate(new Date()),
            msg,
            from:User1,
            to:User2,
            media:iurl || "",
            file:furl || "",
            audio:aurl || "",
            voiceNote:vurl || "",

        })
        setMsg("");
        setImage("");
        setFile("");
        setPreview("");
    };

    const [preview,setPreview] = useState("");
    const handlePreview = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    };

    // for recoed voicenotes

    const [recordaudio,setRecordAudio] = useState();
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
    const StopRecording = () => {
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
            chat ? 
                <div className='chat'>
                    <div className='message-head'>
                        <div className='avatar-container-chat'>
                            <Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`} style={{width:"100%" , height:"100%"}} />
                        </div>
                        <div className='userinfo-container'>
                            <h1>{chat.name}</h1>
                            <p className={chat.isOnline ? "online" : "offline"}>{chat.isOnline ? "online" : "offline"}</p>
                        </div>
                    </div>
                    <div className="messages">
                        {data ? data.map((datas,i)=><SingleChat key={i} datas={datas} User1={User1} />):null}
                    </div>
                    <div className='chat-footer'>
                        <Footer msg={msg} images={images} setImage={setImage} setAudio={setAudio} setFile={setFile} files={files} setMsg={setMsg} handleSubmit={handleSubmit} handlePreview={handlePreview} StartRecording={StartRecording} StopRecording={StopRecording} recordaudio={recordaudio} />
                    </div>
                    {images ?
                        <div className='preview'>
                            <div className='preview-container'>
                                <img src={preview} alt='previewImage' />
                            </div>
                        </div>
                    :null}
                </div>
            : <h1 className='chat-h1'>Select a user to start a chat.....</h1>
    );
};

export default ChatPage;
