import React , {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth , db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc , doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../context/Auth";
function Navbar(){
    const [userid,setUser]=useState();
    const navigate = useNavigate();
    const user = useContext(AuthContext);

    const handleSignout = async (e) =>{
        e.preventDefault();
        await updateDoc(doc(db,'users',auth.currentUser.uid),{
            isOnline : false,
        });
        await signOut(auth);
        navigate("/login");
    }
    useEffect(()=>{
        if(user && auth.currentUser){
            console.log(user, auth.currentUser,"auth.currentUserauth.currentUser")
            getDoc(doc(db , "users" , auth.currentUser.uid)).then( docSnap => {
                if(docSnap.exists){
                    setUser(docSnap.data())
                }
            } )
        }
    },[user])

    // console.log(userid);
    return(
        <>
            <nav>
                <h3><Link to ="/" >Messenger</Link></h3>
                <div className="profile">
                {user ? 
                        <>
                            <Link to="/profile">
                            {/* <div className="user_details">
                                <img src={ userid.avatar ? userid.avatar : require("../Images/image1.jpeg")} alt="Avatar" className="avatar" />
                            </div> */}
                            </Link>
                            <button className="btn" onClick={handleSignout}>Logout</button>
                        </>:
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </>
                    }
                </div>
            </nav>
        </>
    );
}
export default Navbar;