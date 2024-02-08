
import './App.css';
import Navbar from './Navbar';
import Network from './Network';
import Profile from './Profile';
// import Register from './Register';
import Login from './Login';
import { Route , Routes , BrowserRouter} from 'react-router-dom';
import Register from './Register';
import Settings from './Settings';


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
       <Routes>
         <Route exact path = "/home" element={<Profile/>}/>
         <Route exact path = "/" element={<Login/>}/>
         <Route exact path = "/register" element={<Register/>}/>
         <Route path = "/network" element={<Network/>}/>
         <Route path = "/settings" element={<Settings/>}/>
       </Routes>
      </BrowserRouter>
  );
}

export default App;
