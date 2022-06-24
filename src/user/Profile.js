import { Camera } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebase';

function Profile() {

    const [seed,setSeed] = useState("");
    const [user,setUser] = useState("");
    const[profile,setProfile] = useState("");

    useEffect(()=>{
        getDoc(doc(db , "users" , auth.currentUser.uid)).then( docSnap => {
            setUser(docSnap.data())
        } )
        setSeed(Math.floor(Math.random()*5000));
        if(profile){
            const uploadProfile = async () => {
                const profileRef = ref( storage , `avatar/${new Date().getTime()} - ${profile.name}`);
                const snap = await uploadBytes(profileRef , profile);
                const url = await getDownloadURL(ref(storage , snap.ref.fullPath))

                await updateDoc(doc(db , "users" , auth.currentUser.uid) , {
                    avatar : url,
                    avatarPath : snap.ref.fullPath,
                });
                setProfile("");
            };
            uploadProfile();
        }

    },[profile])

    return (
        <div className='profile'>
            <div className='profile-container'>
                <div className='avatar-container'>
                    {user.avatar?<img src={user.avatar} alt='Profile' />:<Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`} style={{width:"100%" , height:"100%"}} />}
                    <div className='change-avatar-container'>
                        <label htmlFor="profile-change">
                            <Camera style={{cursor:"pointer"}}/>
                        </label>
                        <input type="file" id="profile-change" style={{display:"none"}} accept="image/*" onChange={(e)=>{setProfile(e.target.files[0])}} />
                    </div>
                </div>
                <div className='userinfo-container'>
                    <h1>{user.name}</h1>
                    <h4>{user.email}</h4>
                </div>
            </div>
        </div>
    );
}

export default Profile
