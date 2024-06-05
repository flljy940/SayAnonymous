import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  } from 'react-native';

export default function LoginButton() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSignIn = async () => {
    // Handle sign-in logic
    // alert(`Email: ${email}, Password: ${password}`);
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST", // or 'PUT'
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    console.log("debug", result);
  };

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
