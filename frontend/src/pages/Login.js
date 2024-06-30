import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = ({ onToggle }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = { email, password };

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Data:', data);
                localStorage.setItem('token', data.token);
                // alert(`Token: ${data.token}`);
                navigate('/pages/home');
            } else {
                const error = await response.text();
                alert(`Error: ${error}`);
            }
        } catch (error) {
            alert('Failed to fetch');
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                <input type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exxxxxxx@u.nus.edu"
                    required /></div>
                <div>
                <input type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required /></div>
                <div className="toggle" onClick={onToggle}>
                  Don't have an account? Register
                </div>
                <div className="terms">
                  By clicking continue, you agree to our Terms of Service and Privacy Policy
                </div>
                <button type="submit" onClick={handleSubmit}>
                    {/* <Link to="/pages/home/*" className='toClick'> */}
                        Login
                    {/* </Link> */}
                </button>
            </form>
        </div>
    );
};

export default Login;