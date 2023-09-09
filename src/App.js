// import logo from './logo.svg';
import './App.css';
import Home from './components/Home.js';
import Login from './components/Login.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Auth } from "./firebase-config.js"
function App() {
  const [user] = useAuthState(Auth)

  return (
    <>

         

        
          <Router>
            {
             user ? (
               <Home />
             )
             : (
              <Routes>
              <Route path='/login' element={<Login />} />
            </Routes>
             )
            }
            
          </Router>

     


    </>

  );
}

export default App;
