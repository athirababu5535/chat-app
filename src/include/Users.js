import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Users({user , SelectUser , User1}){
    const User2 = user?.uid;
    const [data , setData] = useState("");
    const id = User1 > User2 ? `${User1 + User2}` : `${User2 + User1}`;
    useEffect(()=>{
        let unsub = onSnapshot(doc(db , "lastmessage" , id),doc=>{
            setData(doc.data());
        })
        return () => unsub
    },[]);
    
    return(
        <>
            <div className="user_wrapper" onClick={()=> SelectUser(user)}>
                <div className="user_info">
                        <img src={user.avatar || require("../Images/image1.jpeg")} alt="Avatar" className="avatar" />
                    <div className="user_details">
                        <h4>{user.name}</h4>
                        <p className={`user_status ${user.isOnline ? "online" : "offline" }`}>
                            {User1 === data?.from ? data?.text.slice(0, 30) : data?.isTyping ? "typing....." : data?.text ? `${(data.text).slice(0, 30)}....` : user.isOnline ? "online" : "------" }
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Users;
