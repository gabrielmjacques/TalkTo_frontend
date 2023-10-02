import './App.scss';
import Chat from './pages/Chat';
import Rooms from './pages/Rooms';
import NavBar from './components/NavBar';

import { Route, Routes } from 'react-router-dom';

import { useState } from "react";
import { ConfigProvider, theme } from "antd";

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <>
      <ConfigProvider
        theme={ { algorithm: darkAlgorithm } }
      >

        <NavBar />
        <Routes>
          <Route path='/' element={ <Rooms /> } />
          <Route path='/chat' element={ <Chat /> } />
        </Routes>

      </ConfigProvider >
    </>
  );
}

export default App;
