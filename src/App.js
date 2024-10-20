import React from 'react';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/pages/Home';
import Horarios from './components/pages/Horarios';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Profile from './components/pages/Profile';
import '@fontsource/roboto/300.css'; // Light
import '@fontsource/roboto/400.css'; // Regular
import '@fontsource/roboto/500.css'; // Medium
import '@fontsource/roboto/700.css'; // Bold

function App() {
  return (
    <>
      <Router>
          <Navbar/>
          <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='/horarios'exact Component={Horarios} />
            <Route path='/voy'exact Component={SignIn} />
            <Route path='/registrarme'exact Component={SignUp} />
            <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
