import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './Auth.css';


const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="body">
            <div className="name">SayAnonymous</div>
            <div>{isLogin ? <Login onToggle={handleToggle} /> : <Register onToggle={handleToggle} />}</div>
        </div>
    );
};

export default Auth;

