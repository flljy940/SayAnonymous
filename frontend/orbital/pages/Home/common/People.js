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
    <div style = {styles.suggestedPeople}>
      <Text style = {styles.peopleTitle}> Suggested People</Text>
      <Person name="Daniel" file='./assets/snack-icon.png' id='@danni'/>
      <Person name="StraightAs" file='./pictures/home.png' id='@AAA'/>
    </div>
  );
}

const styles = StyleSheet.create({
  suggestedPeople: {
    // flex: 0.5,
    justifyContent: 'center',
    borderColor: '#021A56',
    width: 'fit-content',
    height: 'fit-content',
    borderRadius: 8,
  },
  peopleTitle: {
    fontFamily: 'sans-serif',
    fontWeight: 600,
  }
});
