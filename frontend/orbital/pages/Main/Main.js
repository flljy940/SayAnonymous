import React from 'react';
import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  View,
  TouchableOpacity,
  } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';
// import { Navigate } from "react-router-dom";
import GetStarted from './GetStarted.js';
import SearchBar from './SearchBar.js';

function MainPage() {
  /* const [goToLogInPage, setGoToLogInPage] = React.useState(false);

  if (goToLogInPage) {
    return <Navigate to="/api/auth/login" />;
  }

  const [goToSignUpPage, setGoToSignUpPage] = React.useState(false);

  if (goToSignUpPage) {
    return <Navigate to="/api/auth/register" />;
  } */

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.container}>
        <View style = {styles.headline}>
          <View style = {styles.headline1}>
            <Text style= {styles.name}>
              SayAnonymous 
            </Text>
        
            <TouchableOpacity style = {styles.option}>
              <View>
                <Text style = {styles.feature}>
                  Feature
                </Text>
              </View>
      
            </TouchableOpacity>
          
            <TouchableOpacity style = {styles.option}>
              <View>
                <Text style = {styles.feature}>
                  Community
                </Text>
              </View>
      
            </TouchableOpacity>

            <TouchableOpacity style = {styles.option}>
              <View>
                <Text style = {styles.feature}>
                  Log In
                </Text>
              </View>
            
            </TouchableOpacity>
            
            <TouchableOpacity style = {styles.option}>
              <View>
                <Text style = {styles.feature}>
                  Sign Up
                </Text>
              </View>
              
            </TouchableOpacity>

          </View>
          <SearchBar />
          

        </View>
        
        <View style = {styles.titleAndButton}>
          <Text style={styles.title}>
            Delve deep into the intricacies of SayAnonymous
          </Text>
          <GetStarted />
        </View>

      </View>

        
    </SafeAreaView>
  );
}

export default function Main() {
  return ( 
    
    <MainPage />
    
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    color: '#0539BC',
    paddingHorizontal: 30,
    // paddingBottom: 10,
  },
  headline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  headline1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    // borderColor: 'blue',
    // color: 'blue',
  },
  title: {
    // margin: 24,
    paddingTop: 60,
    marginBottom: 70,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#0539BC"
  },
  titleAndButton: {
    justifyContent: 'space-between',
    // marginBottom: 15,
  },
  feature: {
    textAlign: 'centre',
    justifyContent: 'center',
    color: '#000000',
    paddingHorizontal: 5,
    // backgroundColor: "black",
    fontSize: 20,

  },
  blank: {
    margin: 2,
  },
  option: {
    justifyContent: 'center',
    paddingHorizontal: 5,
  },

});