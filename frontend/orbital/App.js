import { Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import Main from './pages/Main/Main.js';
import CreateAccount from './pages/Auth/CreateAccount.js';
import LogIn from './pages/Auth/LogIn.js';
import HomeTop from './pages/Home/HomeTop.js'
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      
        
        <LogIn />
        
        
      

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
