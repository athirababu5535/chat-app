import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// css import

import './App.css';

// imports from includes

import Navbar from './includes/Navbar';
import AuthProvider from './includes/auth';

// imports from screens

import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';

// imports from user

import Profile from './user/Profile';
// import Nothing from './nothing/Nothing';


function App() {
  // varialble for login and registrt page
  const [data, setData] = useState({
    email: "",
    password: "",
    error:null,
    loading: false,
  });
  // handlechange function for login and register page
  const handleChange = (e) =>{
      setData({...data, [e.target.name]: e.target.value})
  }
  
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
        {/* <Route path="/" element={<Nothing />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login data={data} setData={setData} handleChange={handleChange} />} />
          <Route path="/register" element={<Register data={data} setData={setData} handleChange={handleChange}  />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
