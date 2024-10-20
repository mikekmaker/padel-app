import React, { useState, useEffect } from 'react';
import { isAuthenticated, logout } from '../helpers/authorization';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate(); // To navigate after logout
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      setIsLoggedIn(result); // Update login status
    };

    checkAuth(); // Check authentication status on mount
    showButton();

    window.addEventListener('resize', showButton);
    return () => window.removeEventListener('resize', showButton);
  }, []);

  window.addEventListener('resize', showButton);

  const handleLogout = () => {
    logout(); // Implement the logout logic
    setIsLoggedIn(false); // Update state after logout
    navigate('/'); // Redirect after logout
  };


  return (
    <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Padel&nbsp;
            <i className='fa-solid fa-table-tennis-paddle-ball' />&nbsp;Club
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                Mi perfil
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/horarios'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Horarios
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/administracion'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Administraci&oacute;n
              </Link>
            </li>
            <li className='nav-item'>
              {isLoggedIn ? (
                <Button buttonStyle='btn--outline' onClick={handleLogout}>SALIR</Button>
                ) : (
                  <Link
                    to='/registrarme'
                    className='nav-links-mobile'
                    onClick={closeMobileMenu}
                  >
                    Registrarme
                  </Link>
                )
              }
            </li>
          </ul>
          {button && !isLoggedIn && <Button buttonStyle='btn--outline' linkTo='/registrarme'>REGISTRARME</Button>}
        </div>
      </nav>
  );
}

export default Navbar;
