import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  View,
  TouchableOpacity,
  } from 'react-native';
import Topic from './Topic.js'

// props: an array of person
export default function People(props) {
  return (
    <div style = {styles.suggestedPeople}>
      <Text>Topics you might like</Text>
      <Topic name="CodingFan" file='./assets/snack-icon.png' num='2k'/>
      <Topic name="LoveStories" file='./pictures/home.png' num='125'/>
    </div>
  );
}

const styles = StyleSheet.create({
  suggestedPeople: {
    // flex: 0.5,
    justifyContent: 'center',
    borderColor: '#021A56',
    width: 'fit-content',
    width: 'fit-content',
    borderRadius: 8,
  },
});
