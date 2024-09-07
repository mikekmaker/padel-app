import React from 'react';
import { Button } from '../Button';
import '../../App.css';
import { FancyInput } from '../../components/FancyInput';

export default function SignIn() {
  return ( 
  <div className='hero-container'>
      <h3 className='sign-up'>INGRESAR A PADEL ARGENTINA</h3>
      <h3 className="text-4xl font-medium">Usuario</h3>
      <FancyInput label="" placeholder="Ingrese su usuario" type="text" />
      <h3 className="text-4xl font-medium">Contrase&ntilde;a</h3>
      <FancyInput label="" placeholder="Ingrese su contrase&ntilde;a" type="text" />
      <div className='hero-btns'>
      <Button
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
        linkTo='/ingresar'
      >
        Ingresar <i className='fa fas fa-key' />
      </Button>
      <Button
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
        linkTo='/recordarme'
      >
        Recordarme <i className='fa fas fa-brain' />
      </Button>
      <h3 className='sign-up'>TEMPERATURA ACTUAL 25&#176;C</h3>
      </div>
  </div>


);
}