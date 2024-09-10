import React, { useState, useEffect } from 'react';
import { Config } from '../../config';
import '../../App.css';
import './SignUp.css';
import { FancyInput } from '../../components/FancyInput';
import axios from 'axios';
import {handleServerError,handleNetworkError} from '../../components/HandlerError';

export default function SignUp() {
  const [formData, setFormData] = useState({
    usuarioId: '0',
    alias: '',
    contrasena: '',
    recontrasena:'',
    nombre: '',
    apellido: '',
    genero: '',
    edad: '',
    direccion: '',
    email: '',
    remail:'',
    telefono: '',
    nivel: '',
    tipoJuego:'',
    fotoperfil: '',
    idTipoUsuario: 3
  });

  const [photoBase64, setPhotoBase64] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [edad, setEdad] = useState('');
  const imageType = 'png';

  //inicializo opciones de controles
  const optionsNivel = [
    { value: 'principiante', label: 'Principiante' },
    { value: 'intermedio', label: 'Intermedio' },
    { value: 'avanzado', label: 'Avanzado' }
  ];
  
  const optionsTipoJuego = [
    { value: 'reves', label: 'Reves' },
    { value: 'drive', label: 'Drive' },
    { value: 'indistinto', label: 'Indistinto' }
  ];

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

    // Validate the form
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
        if (!formData[key]) {
            newErrors[key] = 'Este campo es obligatorio';
        }
    });

    if (Object.keys(newErrors).length > 0) {
        setFormErrorMessage('Por favor, complete todos los campos obligatorios.');
        setErrors(newErrors);
      } else {
        setFormErrorMessage('');
        // Create FormData object
        const data = new FormData();
        data.append('usuarioId', formData.usuarioId);
        data.append('alias', formData.alias);
        data.append('contrasena', formData.contrasena);
        data.append('nombre', formData.nombre);
        data.append('apellido', formData.apellido);
        data.append('genero', formData.genero);
        data.append('edad', formData.edad);
        data.append('direccion', formData.direccion);
        data.append('email', formData.email);
        data.append('telefono', formData.telefono);
        data.append('nivel', formData.nivel);
        data.append('tipoJuego',formData.tipoJuego);
        data.append('idTipoUsuario',formData.idTipoUsuario)

        if (formData.fotoperfil) {
             data.append('fotoPerfil', photoBase64);
        }

        try {
            //Send data to the server
            console.log("data a enviar:");
            for (let pair of data.entries()) {
              console.log(`${pair[0]}: ${pair[1]}`);
            }
            const response = await axios.post(`${Config.apiPrefix}/usuario`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  'accept':'application/json'
                }
              }
            );
            console.log('Response:', response.data);
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

  const handlePhotoChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotoBase64(reader.result);
        };
        reader.readAsDataURL(file);
        console.log("cargado")
    }
    else
    {
      setPhotoBase64('')
      console.log("vaciado")
    }
  };

  useEffect(() => {
    if (photoBase64) {
      setImageSrc(photoBase64);
    }
  }, [photoBase64, imageType]);

  const limitInput = (e) => {
    let inputValue = e.target.value;

    // Ensure the value is not longer than 2 characters
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2);
    }

    // Ensure the value doesn't exceed 99
    if (inputValue > 99) {
      inputValue = 99;
    }

    setEdad(inputValue);
  };


  return ( 
    <>
    <h1 className='sign-up'>Quiero ser parte de Padel Club Argentina</h1>
    <div className='hero-container'>
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
              <div>
                  <h3 className="text-4xl font-medium">Repetir Contrase&ntilde;a</h3>
                  <FancyInput label="" placeholder="reingrese su contrase&ntilde;a" type="text" value={formData.recontrasena}
                    name="recontrasena"
                    className={`fancy-input ${errors.recontrasena ? 'fancy-input-error' : ''}`}
                    onChange={handleChange} />
                    {errors.recontrasena && <p className="error">{errors.recontrasena}</p>}
              </div>
              <div>
                  <h3 className="text-4xl font-medium">Nombre</h3>
                  <FancyInput label="" placeholder="Ingrese su nombre" type="text" value={formData.nombre}
                    name="nombre"
                    className={`fancy-input ${errors.nombre ? 'fancy-input-error' : ''}`}
                    onChange={handleChange} />
                    {errors.nombre && <p className="error">{errors.nombre}</p>}
              </div>
              <div>
                  <h3 className="text-4xl font-medium">Apellido</h3>
                  <FancyInput label="" placeholder="Ingrese su apellido" type="text" value={formData.apellido}
                    name="apellido"
                    className={`fancy-input ${errors.apellido ? 'fancy-input-error' : ''}`}
                    onChange={handleChange} />
                    {errors.apellido && <p className="error">{errors.apellido}</p>}
              </div>
              <div>
                  <h3 className="text-4xl font-medium">G&eacute;nero</h3>
                  <div  className="radio-group">
                      <div className="radio-item">
                      <FancyInput label="" placeholder="Ingrese su g&eacute;nero" type="radio" id="masculino" value="Masculino"
                        name="genero"
                        checked={formData.genero === 'Masculino'}
                        className={`fancy-input ${errors.genero ? 'fancy-input-error' : ''}`}
                        onChange={handleChange} /><label htmlFor='masculino'>Masculino</label>
                      </div>
                      <div  className="radio-item">
                      <FancyInput label="" placeholder="Ingrese su g&eacute;nero" type="radio" id="femenino" value="Femenino"
                        name="genero"
                        checked={formData.genero === 'Femenino'}
                        className={`fancy-input ${errors.genero ? 'fancy-input-error' : ''}`}
                        onChange={handleChange} /><label htmlFor='masculino' className='ml-2'>Femenino</label>
                      </div>
                  </div>
                  {errors.genero && <p className="error">{errors.genero}</p>}
              </div>
              <div>
                  <h3 className="text-4xl font-medium">Edad</h3>
                  <FancyInput label="" placeholder="ingrese su edad" type="number" min="0" max="99" maxLength="2" onInput={limitInput} value={edad} 
                    name="edad"
                    className={`fancy-input ${errors.edad ? 'fancy-input-error' : ''}`}
                    onChange={handleChange} />
                    {errors.edad && <p className="error">{errors.edad}</p>}
              </div>
              <div>
                  <h3 className="text-4xl font-medium">Direcci&oacute;n</h3>
                  <FancyInput label="" placeholder="ingrese su direcci&oacute;n" type="text" value={formData.direccion}
                    name="direccion"
                    className={`fancy-input ${errors.direccion ? 'fancy-input-error' : ''}`}
                    onChange={handleChange} />
                    {errors.direccion && <p className="error">{errors.direccion}</p>}
              </div>
              <div>
                  <h3 className="text-4xl font-medium">Email</h3>
                  <FancyInput label="" placeholder="Ingrese su email" type="email" value={formData.email}
                    name="email"
                    className={`fancy-input ${errors.email ? 'fancy-input-error' : ''}`}
                    onChange={handleChange} />
                    {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div>
                  <h3 className="text-4xl font-medium">Repetir Email</h3>
                  <FancyInput label="" placeholder="reingrese su email" type="email" value={formData.remail}
                    name="remail"
                    className={`fancy-input ${errors.remail ? 'fancy-input-error' : ''}`}
                    onChange={handleChange} />
                    {errors.remail && <p className="error">{errors.remail}</p>}
              </div>
              <div>
                  <h3 className="text-4xl font-medium">Tel&eacute;fono</h3>
                  <FancyInput label="" placeholder="Ingrese su tel&eacute;fono" type="tel" value={formData.telefono}
                    name="telefono"
                    className={`fancy-input ${errors.telefono ? 'fancy-input-error' : ''}`}
                    onChange={handleChange} />
                    {errors.telefono && <p className="error">{errors.telefono}</p>}
              </div>
              <div>
                  <h3 className="text-4xl font-medium">Nivel de juego</h3>
                  <select label="" placeholder="ej: principante, intermedio, avanzado" type="text" value={formData.nivel}
                    name="nivel"
                    className={`fancy-input ${errors.nivel ? 'fancy-input-error' : ''}`}
                    onChange={handleChange}>
                    <option value="" disabled>Select nivel</option>
                    {optionsNivel.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.nivel && <p className="error">{errors.nivel}</p>}
              </div>
              <div>
                  <h3 className="text-4xl font-medium">Tipo de juego</h3>
                  <select label="" placeholder="reves, drive, indistinto" type="text" value={formData.tipoJuego}
                    name="tipoJuego"
                    className={`fancy-input ${errors.tipoJuego ? 'fancy-input-error' : ''}`}
                    onChange={handleChange}>
                     <option value="" disabled>Select tipo de juego</option>
                      {optionsTipoJuego.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                    {errors.tipoJuego && <p className="error">{errors.tipoJuego}</p>}
              </div>
              <div>
                  <FancyInput label="" placeholder="" type="hidden" value={formData.idTipoUsuario}
                    name="idTipoUsuario"
                    className={`fancy-input ${errors.idTipoUsuario ? 'fancy-input-error' : ''}`}
                    onChange={handleChange} />
                    {errors.idTipoUsuario && <p className="error">{errors.idTipoUsuario}</p>}
              </div>
              <div>
                <h3 className="text-4xl font-medium">Foto de perfil</h3>
                <FancyInput placeholder="Suba su foto" type="file" value={formData.fotoperfil}
                  name="fotoperfil"
                  className={`fancy-input ${errors.fotoperfil ? 'fancy-input-error' : ''}`}
                  onChange={handlePhotoChange} />
                  {errors.fotoperfil && <p className="error">{errors.fotoperfil}</p>}
              </div>
              {formErrorMessage && <div className="floating-error">{formErrorMessage}</div>}
              <button type="submit"  className="btns btn--outline btn--large">Enviar</button>
      </form>
      <div>
              {imageSrc && <img src={imageSrc} alt="Preview" />}
              </div>
    </div>       
    </>
  );
}