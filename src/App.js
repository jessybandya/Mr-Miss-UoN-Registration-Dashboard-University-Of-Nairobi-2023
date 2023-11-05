import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const authId = useSelector((state) => state.authId);
  return (
    <div>
    <Header />
     {authId ?(
      <Home />
     ):(
      <Login />
     )}
    </div>
  );
}

export default App;
