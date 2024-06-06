import React, { useState } from "react";
import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  View,
  TouchableOpacity,
  } from 'react-native';
//import SignUp from "./SignUp"

export default function CreateAccount({ navigation }) {
  const [email, setEmail] = React.useState("");

  const handleSignUp = () => {
    //Handle sign-up logic here
    Alert.alert('Sign Up', 'Email: ${email}');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.headline}>
          <Text style= {styles.name}>
            SayAnonymous 
          </Text>
      </View>

      <View style = {styles.instructions}>
        <Text style = {styles.instruction1}>
          Create an account
        </Text>
        <Text style = {styles.instruction2}>
          Enter your NUS email to sign up
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Button title="Sign Up" onPress={handleSignUp} />
        
        <View style = {styles.oneLineWithPadding}>
          <Text style = {styles.already}>
            Already have account?
          </Text>
          <TouchableOpacity>
            <Text style = {styles.detail}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>

        <View style = {styles.extras}>
          <Text style ={{color: '#828282'}}>
            By clicking continue, you agree to our 
          </Text>
          <View style = {styles.oneLine}>
            <TouchableOpacity>
              <Text style = {styles.terms}>
                Terms of Service
              </Text>
            </TouchableOpacity>
            <Text style ={{color: '#828282'}}>
              and
            </Text>
            <TouchableOpacity>
              <Text style = {styles.terms}>
                Privacy Policy
              </Text>
            </TouchableOpacity>  
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    color: '#0539BC',
    paddingHorizontal: 30,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
  },

  headline: {
    flexDirection: 'row',
    paddingBottom: 20,
  },

  instructions: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  instruction1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 2,
    paddingBottom: 5,
  },
  instruction2: {
    fontSize: 30,
    marginHorizontal: 5,
    marginVertical: 2,
    paddingBottom: 10,
  },
  oneLineWithPadding: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  oneLine: {
    flexDirection: 'row',
  },
  extras: {
    justifyContent: 'flex-end',
    paddingTop: 20,
  },
  already: {
    color: '#828282',
  },
  detail: {
    textDecorationLine: 'underline',
    color: '#0539BC',
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
  terms: {
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
    width: '80%',
  },
});
