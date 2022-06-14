import React, { useState } from "react";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc , doc, Timestamp} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { auth, db } from "../firebase";

function Register(){
    const history = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error:null,
        loading: false,
    });
    const {name,email,password,error,loading} = data;
    const handleChange = (e) =>{
        setData({...data, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setData({...data, loading : true, error : null})
        if(!name || !email || !password){
            setData({...data ,error : "All Field Required"});
        }
        try{
            const result = await createUserWithEmailAndPassword(auth,email,password);
            await setDoc(doc(db, 'users' , result.user.uid) , {
                uid : result.user.uid,
                name,
                email,
                createAt : Timestamp.fromDate(new Date()),
                isOnline : true ,
                isTyping : false,
            });
            history("/")
            console.log("Account Created");
            setData({name:'',email:'',password:'',error:null,loading:false})
        }catch(err){
            setData({...data, error : err.message, loading : false});
            console.log(err.message);
        }
    }
    return(
        <>
            <section>
                <h3>Create An Account</h3>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input_container">
                        <label htmlFor="name">Name</label>
                        <input onChange={handleChange} value={name} type="text" name="name" />
                    </div>
                    <div className="input_container">
                        <label htmlFor="email">Email</label>
                        <input onChange={handleChange} value={email} type="email" name="email" />
                    </div><div className="input_container">
                        <label htmlFor="paswword">Password</label>
                        <input onChange={handleChange} value={password} type="password" name="password" />
                    </div>
                    {error ? <p className="error_field">{error}</p> : null}
                    <div className="btn_container">
                        <button className="btn" disabled={loading}>
                            {loading ? 'Creating ....' : 'Register'}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Register;