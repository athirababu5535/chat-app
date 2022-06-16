import React from 'react';
import { useNavigate } from 'react-router-dom';

// firebase imports

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from 'firebase/firestore';


function Login({data,setData,handleChange}) {

    const navigate = useNavigate();

    const {email,password,error,loading} = data;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({...data,loading:true,error:null});
        if(!email || !password){
            setData({...data,error:"All fields are require"});
        }
        try {
            const result = await signInWithEmailAndPassword(auth,email,password);
            await updateDoc(doc(db,"users",result.user.uid),{
                isOnline:true,
            });
            navigate("/");
            setData({name:"",email:"",password:"",error:null,loading:false})
        } catch (err) {
            setData({...data,error:err.message,loading:false})
        }
        setData("")
    }

  return (
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
  )
}

export default Login
