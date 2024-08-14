import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = ({ onToggle }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = { email, password, username };

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // alert('Registered successfully.');
                const data = await response.json();
                console.log('Data:', data);
                localStorage.setItem('token', data.token);
                navigate('/pages/home/top');
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
                <h2>Register</h2>
                <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exxxxxxx@u.nus.edu"
                    required /></div>
                <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                /></div>
                <div>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                /></div>
                <div className="toggle" onClick={onToggle}>
                  Already have an account? Login
                </div>
                <div className="terms">
                  By clicking continue, you agree to our Terms of Service and Privacy Policy
                </div>

                <button type="submit" onClick={handleSubmit}>
                    {/* <Link to="/pages/home/*" className='toClick'> */}

                        Register
                    {/* </Link> */}
                </button>
            </form>
        </div>
    );
};

export default Register;
