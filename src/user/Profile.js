import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';

function Profile() {
    
    const [seed,setSeed] = useState("");
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[])
    return (
        <section className='profile'>
            <div className='avatar-container'>
              <Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`} style={{width:"100%" , height:"100%"}} />
            </div>
            <div className='userinfo-container'>
                <h1>name</h1>
                <h4>email</h4>
                <p>createdAt</p>
            </div>
        </section>
    );
}

export default Profile
