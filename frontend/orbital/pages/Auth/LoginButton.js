import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  } from 'react-native';
  import axios from 'axios';
  import { BrowserRouter as Router, Routes, Route, useNavigate  } from "react-router-dom";
  import HomeTop from '../Home/HomeTop.js';

export default function LoginButton() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [successLogin, setSuccessLogin] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSignIn = async () => {
    // Handle sign-in logic

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token } = response.data;
      // Store the token in localStorage
      localStorage.setItem('authToken', token);
      // Redirect or update UI
      alert(`Email: ${email}, Password: ${password}`);
      setSuccessLogin(true);
    } catch (error) {
      console.error('Login failed: ', error);
    }
  };

  // Effect to handle redirection upon successful login
  useEffect(() => {
    if (successLogin) {
      navigate("/home");
    }
  }, [successLogin, navigate]);

  return (
    <>
      <section className="email-section">
        <input
          type="email"
          className="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
      </section>
      <section className="password-section">
        <input
          type="password"
          className="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        />
      </section>
      <button className="signin-button" onClick={handleSignIn}>
        Sign In
      </button>
      <style jsx>{`
        .email-section,
        .password-section {
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 8px;
          margin-bottom: 8px;
          font-size: 16px;
          width: 100%;
          max-width: 250px;
        }
        .email,
        .password {
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          color: #828282;
          font: 20px/100% Inter, sans-serif;
          white-space: nowrap;
          border: none;
          outline: none;
        }
        .signin-button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          border: none;
          border-radius: 8px;
          background-color: #0335b4;
          color: #fff;
          padding: 6px 0;
          font: 500 20px/140% Inter, -apple-system, Roboto, Helvetica, sans-serif;
          cursor: pointer;
          width: 270px;
        }
        .signin-button:hover {
          background-color: #0056b3;
        }
        @media (max-width: 991px) {
          .email-section,
          .password-section,
          .signin-button {
            margin: 10px 0 0 0;
          }
          .email,
          .password {
            white-space: initial;
          }
        }
      `}</style>
    </>
  );
}
