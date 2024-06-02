import * as React from "react";
import {
  SafeAreaView,
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function SideItem(props) {
  return (
    <TouchableOpacity style = {styles.button}>
      <Image loading="lazy" 
        src= {props.file}
        style={{width: 15, height: 15, backgroundColor: 'rgba(5, 57, 188, 0.2)'}} />
      <Text style = {styles.getStarted}>{props.name}</Text>
    </TouchableOpacity>

  );
}


const styles = StyleSheet.create({
  containT: {
    // flex: 0.5,
    justifyContent: 'center',
    backgroundColor: '#021A56',
    
    width: 'fit-content',
    borderRadius: 8,
  },
  button: {
    margin: 24,
    flexDirection: 'row',
    // alignItems: 'center',
    fontSize: 18,
    // justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
    textAlign: 'center',
    width: 'fit-content',
    // backgroundColor: 'rgba(5, 57, 188, 0.2)',
  },
  getStarted: {
    justifyContent: 'center',
    color: '#0539BC',
    paddingVertical: 5,
    // paddingHorizontal: 25,
    // font: 'Helvetica',
  }
});
