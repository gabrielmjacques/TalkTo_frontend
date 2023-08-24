import { useRef } from 'react';
import io from 'socket.io-client';

import './App.css'

function App() {

  const usernameRef = useRef();
  const messageRef = useRef();

  async function handleConnect() {
    const socketConnection = await io.connect( 'http://localhost:3000' )
    socketConnection.emit( 'set_username', usernameRef.current.value )
  }

  return (
    <>
      <main>
        <h1>Olá</h1>

        <hr />

        <label htmlFor="username">Username: </label>
        <input type="text" name='username' ref={ usernameRef } />
        <button onClick={ () => handleConnect() }>Send</button>

        <div className="chat">
          <label htmlFor="message">Message: </label>
          <input type="text" name='message' ref={ messageRef } />


        </div>
      </main>
    </>
  )
}

export default App
