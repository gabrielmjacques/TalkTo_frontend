import './App.scss';
import Chat from './pages/Chat';
import Rooms from './pages/Rooms';
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
        <Route path='/' element={ <Rooms /> } />
        <Route path='/chat' element={ <Chat /> } />
      </Routes>
    </>
  );
}

export default App;
