import React, { useState, useEffect } from 'react';
import { Config } from '../../config';
import '../../App.css';
import './Forms.css';
import { FancyInput } from '../../components/FancyInput';
import {handleServerError,handleNetworkError} from '../../components/HandlerError';
import { UseFetch } from '../../UseFetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WeatherForecast from '../Weatherforecast'; 
import Footer from '../Footer';

export default function SignIn() {

  //formulario para el modelo
  const [formData, setFormData] = useState({
    alias: '',
    contrasena: ''
  });

  //envio de datos
  const [model,setModel] = useState(null);
  const [action,setAction] = useState('NONE');
  let url = `${Config.boApiPrefix}/login`;
  console.log(url);
  const {dataResponse, loading, error} = UseFetch(url, action, model);

  //mensajes
  const eventOk = "Usuario logueado correctamente!";
  const mandatoryFieldMsg = "Este campo es obligatorio";
  const incompleteFieldsError = "Por favor, complete todos los campos obligatorios.";
  const eventError = "Se produjo un error inesperado!";

   //inicialización de lista para validación de datos de formulario
   const [errors, setErrors] = useState({});
   const [formErrorMessage, setFormErrorMessage] = useState('');

   //manejo de cambios en formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  //envio de formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de formulario
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
        if (!formData[key]) {
            newErrors[key] = mandatoryFieldMsg;
        }
    });

    if (Object.keys(newErrors).length > 0) {
        setFormErrorMessage(incompleteFieldsError);
        setErrors(newErrors);
      } else {
        setFormErrorMessage('');
        // Creacion de objeto FormData para enviar instancia del modelo
        const data = new FormData();
        data.append('alias', formData.alias);
        data.append('contrasena', formData.contrasena);

        try {
            setModel(data);
            setAction('POST');
            console.log('Form data submitted:', formData);
        } catch (error) {
          if (!error.response) {
            console.log(handleNetworkError(error));
          } else {
            console.log(handleServerError(error));
          }
        }
      }
  };

  //actualizacion de mensajes en layout
  useEffect(() => {
    console.log('Response Data:', dataResponse);
    console.log("CARGANDO?");
    console.log('Loading:', loading);
    console.log("QUE ERROR DEVUELVE USEFETCH?");
    console.log('Error:', error);

    if (loading) {
      toast.info('Loading...', {autoClose: 500,});
    }
    else
    {
      if (error) {
        toast.error(`${eventError}: ${error}`, {autoClose: 2000,});
      }
      if (dataResponse) {
        toast.success(`${eventOk}`, {autoClose: 1500,});
      }
    }
  }, [dataResponse,loading, error]);

  return ( 
  <>
  <div className='hero-container'>
      <ToastContainer />
      <h3 className='sign-up'>INGRESAR A PADEL ARGENTINA</h3>
      <form onSubmit={handleSubmit} className='hero-container'>
      <div>
          <h3 className="text-4xl font-medium">Alias</h3>
          <FancyInput label="" placeholder="Ingrese su alias" type="text" value={formData.alias}
          name="alias"
          className={`fancy-input ${errors.alias ? 'fancy-input-error' : ''}`}
          onChange={handleChange} />
          {errors.alias && <p className="error">{errors.alias}</p>}
      </div>
      <div>
          <h3 className="text-4xl font-medium">Contrase&ntilde;a</h3>
          <FancyInput label="" placeholder="ingrese su contrase&ntilde;a" type="text" value={formData.contrasena}
          name="contrasena"
          className={`fancy-input ${errors.contrasena ? 'fancy-input-error' : ''}`}
          onChange={handleChange} />
          {errors.contrasena && <p className="error">{errors.contrasena}</p>}
      </div>
      <div className='hero-btns'>
        <button type="submit"  className="btns btn btn--outline btn--large">
          Ingresar <i className='fa fas fa-key' />
        </button>
        <button className="btns btn btn--outline btn--large">
          Olvid&eacute; <i className='fa fas fa-brain' />
        </button>       
      </div>
      {formErrorMessage && <div className="floating-error">{formErrorMessage}</div>}
      </form>
      <WeatherForecast />
  </div>
  <Footer/>
  </>
);
}