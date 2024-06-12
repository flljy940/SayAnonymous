import React from 'react';
import './SignUp.css';

function SignUp() {
    return (
        <div className="container">
            <div className="name">SayAnonymous</div>
            <div className="form-container">
                <h2>Create an account</h2>
                <p>Enter your nus email</p>
                <form id="auth-form">
                    <input type="email" id="email" placeholder="exxxxxxx@u.nus.edu" required />
                    <button type="submit" id="submit-button">Sign up</button>
                </form>
                <div className="toggle">
                    Already have an account? <a href="login.html">Log in</a>
                </div>
            </div>
            <div className="terms">
                By clicking continue, you agree to our Terms of Service and Privacy Policy
            </div>
        </div>
    );
}

export default SignUp;
