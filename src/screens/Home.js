import React, { useEffect, useState } from "react";

// firebase imports

import { collection , onSnapshot, query  , where } from "firebase/firestore";
import { auth, db } from "../firebase";

// imports from user

import Users from "../user/Users";
import ChatPage from "../user/ChatPage";
import MicRecorder from "mic-recorder-to-mp3";


function Home() {
  const [chat, setChat] = useState("");
  const User1 = auth.currentUser.uid;
  const User2 = chat.uid;
  const id = User1 > User2 ? `${User1 + User2}` : `${User2 + User1}`;

  // for homepage

  const [users, setUsers] = useState([]);


  // for recording audio file

  const [recordAudio, setRecord] = useState();

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

  const StopRecording = async () => {

    Mp3Recorder.stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        const Recordfile = new File(buffer, `${new Date().getTime()}-record.mp3`, {
          type: blob.type,
          lastModified: Date.now(),
        });
        setRecord(Recordfile)
      })
      .catch((e) => {
        alert("We could not retrieve your message");
       console.log(e);
      });
  };

  useEffect(() => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "not-in", [auth.currentUser.uid]));
    const unUser = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unUser;
  }, []);

  // function for select specific user

  const handleSelect = (user) => {
    setChat(user);
  };

  return (
    <>
      <div className="home-container">
        <div className="user-container">
          {users.map((user) => (
            <Users
              user={user}
              id={id}
              User1={User1}
              User2={User2}
              key={user.uid}
              handleSelect={handleSelect}
            />
          ))}
        </div>
        <div className="chat-container">
          <ChatPage setRecord={setRecord} recordAudio={recordAudio} StartRecording={StartRecording} StopRecording={StopRecording} chat={chat} id={id} User1={User1} User2={User2} />
        </div>
      </div>
    </>
  );
}

export default Home;
