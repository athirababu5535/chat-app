import React, { useState } from "react";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { updateDoc ,doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { auth, db } from "../firebase";

function Login(){
    const history = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        error:null,
        loading: false,
    });
    const {email,password,error,loading} = data;
    const handleChange = (e) =>{
        setData({...data, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setData({...data, loading : true, error : null})
        if(!email || !password){
            setData({...data ,error : "All Field Required"});
        }
        try{
            const result = await signInWithEmailAndPassword(auth,email,password);
            await updateDoc(doc(db, 'users' , result.user.uid) , { isOnline : true ,});
            history("/")
            console.log("Login Successfull");
            setData({name:'',email:'',password:'',error:null,loading:false})
        }catch(err){
            setData({...data, error : err.message, loading : false});
            console.log(err.message);
        }
    }
    return(
        <>
            <section>
                <h3>Log into your Account</h3>
                <form className="form" onSubmit={handleSubmit}>
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
                            {loading ? 'Logging in ....' : 'Login'}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;