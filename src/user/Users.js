import React, { useEffect, useState } from "react";

// imports from react material icons

import { Avatar } from "@mui/material";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

function Users({ user, handleSelect, User1 , User2 ,chat }) {
  const [seed, setSeed] = useState("");
  const [data,setData] = useState("");
  const id = User1 > User2 ? `${User1 + User2}` : `${User2 + User1}`;
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    if(User2){
      onSnapshot(doc(db,"lastmessage",id),doc=>{
        setData(doc.data());
      })
      // console.log(data);
    }

  }, [User2]);
  // console.log(User1);

  return (
    <div className="userinfo" onClick={() => handleSelect(user)}>
      <div className="avatar-container">
        {user.avatar?
          <img src={user.avatar} alt="Profile" />
        :<Avatar
          src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}
          style={{ width: "100%", height: "100%" }}
        />}
      </div>
      <div className="userinfo-container">
        <p>{user.name}</p>
          <p className={user.isOnline ? "online" : "offline"}>
            {user.uid === data.from ? 
              data.isRecording?"recording...." : data.isTyping?"typing..." : user.isOnline?"online":"offline"
            : user.isOnline ? "Online" 
              : "offline"}
          </p>
      </div>
    </div>
  );
}

export default Users;
