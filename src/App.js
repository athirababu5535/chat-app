import React from 'react';
import './App.css';
import {BrowserRouter ,Routes , Route} from "react-router-dom"
import HomePage from './screens/HomePage';
import Register from './screens/Register';
import Login from './screens/Login';
import Navbar from './include/Navbar'
import AuthProvider from './context/Auth';
import Profile from './screens/Profile';
import PrivateRouter from './include/PrivateRouter';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRouter />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRouter />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
