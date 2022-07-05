import React from 'react'
import { useNavigate } from 'react-router-dom';

// firebase imports

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Register({data,setData,handleChange}) {

    const navigate = useNavigate();

    const {name,email,password,error,loading} = data;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({...data,loading:true,error:null});
        if(!name || !email || !password){
            setData({...data,error:"All field are required"});
        }
        try {
            const result = await createUserWithEmailAndPassword(auth,email,password);
            await setDoc(doc(db,"users",result.user.uid),{
                uid:result.user.uid,
                name,
                email,
                password,
                createdAt:Timestamp.fromDate(new Date()),
            });
            navigate("/");
        } catch (err) {
            setData({...data,error:err.message,loading:false});
        }
        setData("");
    }
  return (
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
  );
}

export default Register
