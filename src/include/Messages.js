import { Check, DoneAllOutlined, Refresh } from "@mui/icons-material";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { db } from "../firebase";

function Messages({msg , User1 , chat, id , User2}){
    const scrollRef = useRef();
    const [data , setData] = useState("");

    useEffect(()=>{
        scrollRef.current.scrollIntoView({behavior : "smooth"});
        let unsub = onSnapshot(doc(db , "lastmessage" , id),doc=>{
            setData(doc.data());
        })
        return unsub;
    },[msg])

    return(
        <>
            {msg.text===data.text?(
                <div className={`message_wrapper ${msg.from === User1 ? "own" : ""}`} ref={scrollRef}>
                    <p className={msg.from === User1 ? "me" : "friend"}>
                        {msg.from === User1 ? <span className="username">you<br/></span> : <span className="username">{chat.name}<br/></span>}
                        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
                        {msg.voice ? <audio controls src={msg.voice} type="audio/mp3"></audio> : null}
                        {msg.text}
                        <br />
                        {msg.to===User2 ?
                            <div className="bottom">
                                <small>
                                    <Moment fromNow>{msg.createdAt.toDate().toDateString()}</Moment>
                                </small>
                                <small>{!data.isLoading?<Refresh></Refresh>:chat.isOnline?<DoneAllOutlined></DoneAllOutlined>:<Check></Check>}</small>
                            </div>
                        :
                            <small>
                                <Moment fromNow>{msg.createdAt.toDate().toDateString()}</Moment>
                            </small>
                        }
                    </p>
                </div>
            ):(
                <div className={`message_wrapper ${msg.from === User1 ? "own" : ""}`} ref={scrollRef}>
                <p className={msg.from === User1 ? "me" : "friend"}>
                    {msg.from === User1 ? <span className="username">you<br/></span> : <span className="username">{chat.name}<br/></span>}
                    {msg.media ? <><img src={msg.media} alt={msg.text} /><br/></> : null}
                    {msg.voice ? <audio controls src={msg.voice} type="audio/mp3" />: null}
                    {msg.text}
                    <br />
                    {msg.to=== User2 ? 
                        <div>
                            <small>
                                <Moment fromNow>{msg.createdAt.toDate().toDateString()}</Moment>
                            </small>
                            <small>{chat.isOnline?<DoneAllOutlined></DoneAllOutlined>:<Check></Check>}</small>
                        </div>
                    :
                        <small>
                            <Moment fromNow>{msg.createdAt.toDate().toDateString()}</Moment>
                        </small>
                    }
                    
                </p>
            </div>
            )}
        </>
    );
}
export default Messages;