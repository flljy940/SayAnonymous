import { Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate } from 'react-router-dom';

// or any files within the Snack
import Main from './pages/Main/Main.js';
import CreateAccount from './pages/Auth/CreateAccount.js';
import LogIn from './pages/Auth/LogIn.js';
import HomeTop from './pages/Home/HomeTop.js'

/* import axios from 'axios';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>React and Node.js Integration</h1>
      <p>Message from the server: {data}</p>
    </div>
  );
}

export default App; */

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/auth/register" element={<CreateAccount />} />
            <Route path="/auth/login" element={<LogIn />} />

            {/* <Route path="/home" element {<HomeTop />} /> */}
          </Routes>
        </Router>
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
