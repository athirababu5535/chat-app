import React, { useEffect, useState } from 'react'

// firebase imports

import { collection , onSnapshot , query , where } from 'firebase/firestore';
import { auth, db } from '../firebase';

// imports from user

import Users from '../user/Users'
import ChatPage from '../user/ChatPage';

function Home() {

    const [chat,setChat] = useState("");
    const User1 = auth.currentUser.uid;
    const User2 = chat.uid;
    const id = User1 > User2 ? `${User1 + User2}` : `${User2 + User1}`;

    
    // for homepage
    
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        const userRef = collection(db,"users");
        const q = query(userRef,where("uid","not-in",[auth.currentUser.uid]));
        const unUser = onSnapshot(q , querySnapshot => {
            let users = [];
            querySnapshot.forEach(doc => {
                users.push(doc.data());
            })
            setUsers(users);
        })
        return () => unUser;
    },[]);

    // function for select specific user
    
    const handleSelect = (user) => {
        setChat(user);
    };

    return (
    <>
        <div className='home-container'>
            <div className='user-container'>
                {users.map(user => (<Users user={user} key={user.uid} handleSelect={handleSelect} />))}
            </div>
            <div className='chat-container'>
                <ChatPage chat={chat} id={id} User1={User1} User2={User2} />
            </div>
        </div>
    </>
    )
}

export default Home
