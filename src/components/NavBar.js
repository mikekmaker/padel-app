import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
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
    showButton();
    window.addEventListener('resize', showButton);
    return () => window.removeEventListener('resize', showButton);
  }, []);

  window.addEventListener('resize', showButton);

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
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Inicio
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
              <Link
                to='/registrarme'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Registrarme
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline' linkTo='/registrarme'>REGISTRARME</Button>}
        </div>
      </nav>
  );
}

export default Navbar;
