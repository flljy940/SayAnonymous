import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  View,
  TouchableOpacity,
  ScrollView
  } from 'react-native';
import SideItem from './SideItem.js'

export default function SideBar() {
  return (
    <ScrollView style = {styles.sideBar}>
      <Text style = {styles.name}>SayAnonymous</Text>
      <SideItem name = 'Home' file = './pictures/home.png' />
      <SideItem name = 'Search' file = './pictures/search.png' />
      <SideItem name = 'Notifications' file = './pictures/search.png' />
      <SideItem name = 'Saved Posts' file = './pictures/search.png' />
      <SideItem name = 'Settings' file = './pictures/search.png' />
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    // paddingHorizontal: 30,
    fontWeight: 'bold',
    // paddingBottom: 10,
  },
  sideBar: {
    flex: 0.5,
    justifyContent: 'center',
    backgroundColor: 'rgba(5, 57, 188, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: 'fit-content',
    // font: 'Helvetica',
  }
});
