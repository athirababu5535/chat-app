import React, { useEffect, useState } from "react";
import Camera from "../include/attachment/Camera";
import { deleteObject, getDownloadURL, ref , uploadBytes} from "firebase/storage"
import { auth, db, storage } from "../firebase";
import { getDoc , doc, updateDoc } from "firebase/firestore"
import Delete from "../include/attachment/Delete";
import { useNavigate } from "react-router-dom";

function Profile(){
    const [img , setImg] = useState("");
    const [user , setUser] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        getDoc(doc(db , "users" , auth.currentUser.uid)).then( docSnap => {
            if(docSnap.exists){
                setUser(docSnap.data())
            }
        } )
        if(img){
            const uploadImg = async () => {
                const imgRef = ref( storage , `avatar/${new Date().getTime()} - ${img.name}`);
                // console.log(imgRef);
                const snap = await uploadBytes(imgRef , img);
                const url = await getDownloadURL(ref(storage , snap.ref.fullPath))

                await updateDoc(doc(db , "users" , auth.currentUser.uid) , {
                    avatar : url,
                    avatarPath : snap.ref.fullPath,
                });
                setImg("");
            };
            uploadImg();
        }
    },[img]);
    const deleteImg = async () =>{
        try {
            const confirm = window.confirm("Delete Avatar ? ");
            if(confirm){
                await deleteObject(ref(storage,user.avatarPath))
                await updateDoc(doc(db, "users" , auth.currentUser.uid),{
                    avatar:"",
                    avatarPath:"",
                });
                navigate("/");
            }
        } catch (err) {
            console.log(err.message);
            window.alert(err.message)
        }
    }
    return user ? (
        <>
            <section>
                <div className="profile_container">
                    <div className="image_container">
                        <img src={user.avatar || require("../Images/image1.jpeg")} alt="Avathar" />
                        <div className="overlay">
                            <div>
                                <label htmlFor="photo">
                                    <Camera />
                                </label>
                                {user.avatar ? <Delete deleteImg={deleteImg} /> : null}
                                <input type="file" accept="/" style={{display:'none'}} id="photo" onChange={e => setImg(e.target.files[0])} />
                            </div>
                        </div>
                    </div>
                    <div className="text_container">
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <hr />
                        <p>Joined on : {user.createAt.toDate().toDateString()}</p>
                    </div>
                </div>
            </section>
        </>
    ) : null;
}

export default Profile;