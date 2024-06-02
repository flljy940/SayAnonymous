import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  View,
  TouchableOpacity,
  } from 'react-native';

import SideBar from './common/SideBar.js';
import People from './common/People.js';
import Topics from './common/Topics.js'

export default function HomeTop() {
  return (
    <View style={styles.shape}> 
      <View style={styles.placeBar}>
        <SideBar />
      </View>
      <View style = {styles.rightSideBar}>
        <View style={styles.placePeople}>
          <People />
        </View>
        <View style={styles.placeTopics}>
          <Topics />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shape: {
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  placeBar: {
    paddingHorizontal: 20,
  },
  rightSideBar: {
    justifyContent: 'space-between',
  },
  placePeople: {
    marginRight: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
  },
  placeTopics: {
    marginRight: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 20,
  },
});






