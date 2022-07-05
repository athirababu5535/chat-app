import React, { useContext, useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";

// firebase imports

import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc, collection, getDoc } from "firebase/firestore";

// import from includes

import { AuthContext } from "./auth";
import { Avatar } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const [cuser,setCurrentuser] = useState("");

  useEffect(()=>{
    if(user){
    const userRef = collection(db, "users");
      getDoc(doc(userRef,auth.currentUser.uid)).then((doc)=>{
        setCurrentuser(doc.data())
      })
    }
  },[cuser?.avatar]);

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
        navigate("/login")
  };
  return (
    <nav>
      <h3>
        <Link to="/">Messenger</Link>
      </h3>
        {user ? (
        <div className="nav-right">
          <>
            <Link to="/profile">
              <div className="nav-avatar-container">
                {cuser?.avatar ? <img src={cuser.avatar} alt="JustPic" />
                :
                <Avatar
                  src={`https://avatars.dicebear.com/api/adventurer/19999.svg`}
                  style={{ width: "100%", height: "100%" }}
                />
                }
              </div>
            </Link>
            <button className="btn" onClick={handleSignout}>
              Logout
            </button>
          </>
        </div>
        ) : (
          <div className="reg-log">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
    </nav>
  );
};

export default Navbar;