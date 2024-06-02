import React, { useState } from "react";
import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  View,
  TouchableOpacity,
  } from 'react-native';


function SignUpForm() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSignUp = () => {
    if (email) {
      // handle sign up logic here
      console.log("Sign Up with Email:", email);
    }
  };

  return (
    <>
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="emailInput" className="visually-hidden">
          Enter your email
        </label>
        
        <View>
          <input
            className="email-input"
            type="email"
            id="emailInput"
            placeholder="Enter your email"
            aria-label="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          <View style = {styles.separate}>
            <button className="signup-button" type="button" onClick={handleSignUp}>
              Sign up
            </button>
          </View>
        </View>
      </form>
      <style jsx>{`
        .signup-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 16px 0 0 0;
          width: 250px;
        }
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
        .email-input {
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 8px;
          margin-bottom: 8px;
          font-size: 16px;
          width: 100%;
          max-width: 250px;
        }
        .signup-button {
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
        @media (max-width: 991px) {
          .signup-form {
            margin-right: 10px;
          }
          .signup-button {
            padding: 6px 0;
          }
        }
      `}</style>
    </>
  );
}

export default SignUpForm;

const styles = StyleSheet.create({
  separate: {
    marginTop: 5,
  }
})

/*
function Email() {
  return (
    <View  style = {styles.emailContainer}>
      <TouchableOpacity>
        <View style = {styles.email}>
          exxxx u.nus.edu
        </View>
      </TouchableOpacity>
    </View>
  );
}

function SignButton() {
  return (
    <View style = {styles.containT}>
      <TouchableOpacity>
        <View style = {styles.signup}>
          Sign up with email
        </View>
      </TouchableOpacity>
    </View>
  );
}


export default function SignUp() {
  return (
    <View style = {styles.combination}>
      <Email />
      <SignButton />
    </View>
  );
}


const styles = StyleSheet.create({
  containT: {
    // justifyContent: 'center',
    backgroundColor: '#0539BC',
    padding: 8,
    width: 'fit-content',
  },
  combination: {
    // margin: 24,
    alignItems: 'center',
    fontSize: 20,
    // justifyContent: 'center',
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  email: {
    // justifyContent: 'center',
    color: '#828282',
    borderColor: '#828282',
    // font: 'Helvetica',
  },
  emailContainer: {
    borderColor: '#828282',
  },
  signup: {
    // justifyContent: 'center',
    color: 'white',
    // font: 'Helvetica',
    
  },

});
*/