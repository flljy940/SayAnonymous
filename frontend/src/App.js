import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import Home from './pages/Home.js';
import Entrance from './pages/Entrance.js';
import Auth from './pages/Auth.js';
import Register from './pages/Register.js';

function App() {
    console.log('App component is being rendered');
    return (
        <div>
        <title>SayAnonymous</title>
        <Router>
            <Routes>
                <Route path="/pages/auth" element={<Auth />} />
                <Route path="/pages/login" element={<Login />} />
                <Route path="/pages/signup" element={<SignUp />} />
                <Route path="/pages/register" element={<Register />} />
                <Route path="/pages/home" element={<Home />} />
                <Route path="/" element={Entrance} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;
