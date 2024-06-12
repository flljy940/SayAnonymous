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
            <h1>hiiii</h1>
            <div className="name">SayAnonymous</div>
            {isLogin ? <Login onToggle={handleToggle} /> : <Register onToggle={handleToggle} />}
            <div className="terms">
                By clicking continue, you agree to our Terms of Service and Privacy Policy
            </div>
        </div>
    );
};

export default Auth;
