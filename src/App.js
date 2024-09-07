import React from 'react';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import Reservas from './components/pages/Reservas';

function App() {
  return (
    <>
      <Router>
          <Navbar/>
          <Routes>
            <Route path='/'exact Component={Home} />
            <Route path='/registrarme'exact Component={SignUp} />
            <Route path='/voy'exact Component={SignIn} />
            <Route path='/reservas'exact Component={Reservas} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
