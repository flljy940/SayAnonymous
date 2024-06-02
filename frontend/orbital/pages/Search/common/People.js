import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  View,
  TouchableOpacity,
  } from 'react-native';
import Person from './Person.js'

// props: an array of person
export default function People(props) {
  return (
    <View>
      <Person name="Daniel" file='./assets/snack-icon.png' id='@danni'/>
      <Person name="StraightAs" file='./pictures/home.png' id='@AAA'/>
    </View>
  );
}

