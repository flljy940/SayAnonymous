import React from "react";
import {
  SafeAreaView,
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
// You can import supported modules from npm
import { Card } from 'react-native-paper';
import { Navigate } from "react-router-dom";

export default function GetStarted() {
  const [goToLogInPage, setGoToLogInPage] = React.useState(false);

  if (goToLogInPage) {
    return <Navigate to="/api/auth/login" />;
  }

  return (
    <View style = {styles.containT}>
      <TouchableOpacity onPress={ () => { setGoToLogInPage(true); }}>
        <Text style = {styles.getStarted}>
          Get Started >>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

/*
export default function LoginButton() {
  return (
    <View style = {styles.loginButton}>
      <GetStarted />
    </View>
  )
}
*/

const styles = StyleSheet.create({
  containT: {
    // flex: 0.5,
    justifyContent: 'center',
    backgroundColor: '#021A56',
    alignItems: 'center',
    width: 'fit-content',
    borderRadius: 8,
    textAlign: 'center',
  },
  loginButton: {
    margin: 24,
    alignItems: 'center',
    fontSize: 18,
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
    textAlign: 'center',
  },
  getStarted: {
    justifyContent: 'center',
    color: 'white',
    paddingVertical: 15,
    paddingHorizontal: 25,
    textAlign: 'center',
    alignItems: 'center',
    // font: 'Helvetica',
  }
});
