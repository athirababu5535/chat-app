import React, { useEffect, useState } from "react";
import { collection , query , where , onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import Users from "../include/Useurs";
import Message from "../include/Message";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Messages from "../include/Messages";

function HomePage(){

    const [users , setUsers] = useState([]);
    const [chat , setChat] = useState("");
    const [text , setText] = useState("");
    const [img , setImg] = useState('');
    const [voice,setVoice] = useState("");
    const [msgs , setMsgs] = useState([]);
    const [previewUrl, setPreviewUrl] = useState();


    const User1 = auth.currentUser.uid;
    const User2 = chat.uid;
    const id = User1 > User2 ? `${User1 + User2}` : `${User2 + User1}`;

    useEffect(()=>{
        const usersRef = collection( db , "users" ); //collects the datas from the database or firestore
        // create object
        const q = query(usersRef , where('uid' , "not-in", [User1])); // q selects the all other users than th ecurrent user
        // execute query
        const unsub = onSnapshot( q , uerySnapshot =>{
            let users = [];
            uerySnapshot.forEach(doc  => {
                users.push(doc.data())
            });
            setUsers(users);
        }) // map the user list
        return () => unsub();
    },[]);

    const SelectUser = (user) => {
        setChat(user);
        const msgRef = collection(db , "messages" , id , "chat");
        const q = query(msgRef , orderBy("createdAt" , "asc"));

        onSnapshot(q , querySnapshot => {
            let msgs = [];
            querySnapshot.forEach(doc =>{
                msgs.push(doc.data())
            });
            setMsgs(msgs);
        })
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        let url;
        let vurl;
        if (img) {
            console.log("success");
            const imgRef = ref(storage , `images/${new Date().getTime()} - ${img.name}`);
            console.log(imgRef);
            const snap = await uploadBytes(imgRef, img);
            const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
            url = dlUrl;
        }
        // if (voice) {
        //     const voiceRef = ref(storage , `voice/${new Date().getTime()} - ${voice.name}`);
        //     const snap = await uploadBytes(voiceRef, img);
        //     const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        //     vurl = dlUrl;
        //     console.log(vurl);
        // }

        await addDoc(collection(db , "messages" , id , "chat"),{
            text,
            from :User1,
            to:User2,
            createdAt:Timestamp.fromDate(new Date()),
            media: url || "",
            voice:voice || "",
        })
        await setDoc(doc(db , "lastmessage" , id) , {
            text,
            from :User1,
            to:User2,
            createdAt:Timestamp.fromDate(new Date()),
            media: url || "",
            unread:true,
            voice: voice || "",
            isLoading:false,
        })

        setText("");
        setVoice(null);
        setImg("");
        setPreviewUrl("");
        
        await updateDoc(doc(db, 'lastmessage' , id) , { isTyping : false ,isLoading:true});
    }

    return(
        <>
            <div className="home_container">
                <div className="users_container">
                    {users.map(user => (<Users key={user.uid} user={user} SelectUser = {SelectUser} User1={User1} />))}
                </div>
                <div className="chat_container">
                    {chat ?
                        <div className="chat_user">
                            <div className="name">
                                <img className="ProfileAvatar" alt="avatar" src={chat.avatar} />
                                <div className="name_container">
                                    <h3>{chat.name}</h3>
                                    <div className={`user_status ${chat.isOnline ? "online" : "offline" }`}>{chat.isOnline ? "online" : "offline" }</div>
                                </div>
                            </div>
                            <div className="messages">
                                {msgs.length ? 
                                    msgs.map((msg , i) => <Messages id={id} key={i} msg={msg} User1={User1} chat={chat} User2={User2} />)
                                :null}
                            </div>
                            <Message previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} id={id} img={img} text={text} handleSubmit={handleSubmit} setText={setText} setImg={setImg} voice={voice} setVoice={setVoice} img={img} />
                        </div>
                    : <h3 className="no_conv">Select a user to start conversation</h3>}
                </div>
            </div>
        </>
    );
}

export default HomePage;
