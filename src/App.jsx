import './App.css';
import Chat from './pages/Chat';
import Login from './pages/Login';
import NavBar from './components/NavBar';

import { useSelector } from 'react-redux';
import { selectUser } from './redux/userSlice';
import { Route, Routes } from 'react-router-dom';

function App() {

  const user = useSelector( selectUser );

  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/chat' element={ <Chat /> } />
      </Routes>
    </>
  );
}

export default App;
