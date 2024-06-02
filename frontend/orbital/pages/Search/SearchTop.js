import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  View,
  TouchableOpacity,
  } from 'react-native';

import SideBar from './common/SideBar.js';
import People from './common/People.js';

export default function HomeTop() {
  return (
    <View> 
      
      <SideBar />
      <People />
    </View>
  );
}







