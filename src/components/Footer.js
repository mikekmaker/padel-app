import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
           Suscribite a nuestro newsletter para recibir novedades de pr&oacute;ximos eventos
        </p>
        <p className='footer-subscription-text'>
          Pod&eacute;s dejar de recibir novedades cuando quieras
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Ingresa tu Email'
            />
            <Button buttonStyle='btn--outline'>Suscribirme</Button>
          </form>
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Qui&eacute;nes Somos</h2>
            <Link to='/sign-up'>C&oacute;mo funciona</Link>
            <Link to='/'>Testimonios</Link>
            <Link to='/'>Unite a nuestro Equipo</Link>
            <Link to='/'>Sum&aacute;te como Sponsor</Link>
            <Link to='/'>T&eacute;rminos y Condiciones</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contacto</h2>
            <Link to='/'>Libro de Quejas</Link>
            <Link to='/'>Consultas</Link>
            <Link to='/'>Recordatorios</Link>
            <Link to='/'>Sponsors</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Videos</h2>
            <Link to='/'>Cancha Confort</Link>
            <Link to='/'>Cancha Relax</Link>
            <Link to='/'>Cancha Emoci&oacute;n</Link>
            <Link to='/'>Cancha Adrenalina</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Nuestras Redes</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>X</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              Padel&nbsp;
              <i className='fa-solid fa-table-tennis-paddle-ball'/>&nbsp;Club
            </Link>
          </div>
          <small className='website-rights'>Padel Club © 2024</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-x-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
