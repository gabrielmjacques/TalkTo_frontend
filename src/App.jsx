import './App.css'
import Chat from './components/Chat'
import Login from './components/Login'
import NavBar from './components/NavBar'

import { useSelector } from 'react-redux'
import { selectUser } from './redux/userSlice'

function App() {

  const user = useSelector( selectUser )

  return (
    <>
      <NavBar />

      { user.isLogged ? < Chat /> : <Login /> }
    </>
  )
}

export default App
