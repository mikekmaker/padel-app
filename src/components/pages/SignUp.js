import React, { useState, useEffect } from 'react';
import { Config } from '../../config';
import '../../App.css';
import './Forms.css';
import { FancyInput } from '../../components/FancyInput';
import { handleError } from '../../components/HandlerError';
import { UseFetch } from '../../UseFetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

  //redirect
  const navigate = useNavigate();

  //formulario para el modelo
  const [formData, setFormData] = useState({
    id: 1,
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
    tipoDeJuego:'',
    idTipoUsuario: 3
  });

  //envio de datos
  const [model,setModel] = useState(null);
  const [action,setAction] = useState('NONE');
  let url = `${Config.boApiPrefix}/usuario`;
  console.log(url);
  const {dataResponse, statusCode, loading, error} = UseFetch(url, action, model);

  //manejo de campos
  const [edad, setEdad] = useState('');

  //inicializar opciones de controles
  const optionsNivel = [
    { value: 'principiante', label: 'Principiante' },
    { value: 'intermedio', label: 'Intermedio' },
    { value: 'avanzado', label: 'Avanzado' }
  ];
  
  const optionsTipoDeJuego = [
    { value: 'reves', label: 'Reves' },
    { value: 'drive', label: 'Drive' },
    { value: 'indistinto', label: 'Indistinto' }
  ];
  //fin inicializar controles

  //mensajes
  const eventOk = "Usuario registrado correctamente!";
  const incompleteFieldsError = "Por favor, complete todos los campos obligatorios.";
  const mandatoryFieldMsg = "Este campo es obligatorio";
  const eventError = "Se produjo un error";

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
            console.log(key);
        }
    });

    const { contrasena, recontrasena, email, remail } = formData;

    // Check if passwords match
    if (contrasena !== recontrasena) {
      toast.error('Las contrase\u00F1as no coinciden');
      return;
    }

    // Check if emails match
    if (email !== remail) {
      toast.error('Los correos electr\u00F3nicos no coinciden');
      return;
    }

    if (Object.keys(newErrors).length > 0) {
        setFormErrorMessage(incompleteFieldsError);
        setErrors(newErrors);
      } else {
        setFormErrorMessage('');
        // Creacion de objeto FormData para enviar instancia del modelo
        const data = new FormData();
        data.append('id', formData.id);
        data.append('nivel', formData.nivel);
        data.append('apellido', formData.apellido);
        data.append('edad', formData.edad);
        data.append('alias', formData.alias);
        data.append('contrasena', formData.contrasena);
        data.append('telefono', formData.telefono);
        data.append('idTipoUsuario',formData.idTipoUsuario);
        data.append('nombre', formData.nombre);
        data.append('tipoDeJuego',formData.tipoDeJuego);
        data.append('email', formData.email); 
        data.append('genero', formData.genero);
        data.append('direccion', formData.direccion);
        data.append('recontrasena',formData.recontrasena);
        data.append('remail',formData.remail);
        data.append('fotoPerfil',"foto.jpg");
        setModel(data);
        setAction('POST');
      }
  };

  //actualizacion de mensajes en layout
  useEffect(() => {
    console.log('Response Data:', dataResponse);
    console.log("CARGANDO?");
    console.log('Loading:', loading);
    console.log("QUE ERROR DEVUELVE USEFETCH?");
    console.log('Error:', error);
    console.log('Status',statusCode)
    if (loading) {
      toast.info('Loading...', {autoClose: 500,});
    }
    else
    {
      if (error) {
        toast.error(`${eventError}: ${handleError(error, statusCode)}`, {autoClose: 2000,});
      }
      else{
        if (dataResponse) {
        toast.success(`${eventOk}`, {autoClose: 1500,});
        setTimeout(() => {
          navigate('/voy', { replace: true });
          }, 1500);
        }
      }
    }
  }, [dataResponse, statusCode, loading, error]);

  //restricciones en layout
  const limitInput = (e) => {
    let inputValue = e.target.value;

    // me aseguro que valor no es mayor a 2 caracteres
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2);
    }

    // me aseguro que valor no supera el 99
    if (inputValue > 99) {
      inputValue = 99;
    }
    setEdad(inputValue);
  };


  return ( 
    <>
    <h1 className='sign-up'>Quiero ser parte de Padel Club Argentina</h1>
    <div className='hero-container'>
      <form  className='hero-container form-grid'>
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
              <div></div>
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
                  <select label="" placeholder="reves, drive, indistinto" type="text" value={formData.tipoDeJuego}
                    name="tipoDeJuego"
                    className={`fancy-input ${errors.tipoDeJuego ? 'fancy-input-error' : ''}`}
                    onChange={handleChange}>
                     <option value="" disabled>Select tipo de juego</option>
                      {optionsTipoDeJuego.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                    {errors.tipoDeJuego && <p className="error">{errors.tipoDeJuego}</p>}
              </div>
              <div>
                  <FancyInput label="" placeholder="" type="hidden" value={formData.idTipoUsuario}
                    name="idTipoUsuario"
                    className={`fancy-input ${errors.idTipoUsuario ? 'fancy-input-error' : ''}`}
                    onChange={handleChange} />
                    {errors.idTipoUsuario && <p className="error">{errors.idTipoUsuario}</p>}
              </div>
              <div></div>
              <button onClick={handleSubmit}  className="btns btn btn--outline btn--large">Enviar</button>
              {formErrorMessage && <div className="floating-error">{formErrorMessage}</div>}
      </form>
      </div>  
      <ToastContainer />
      <Footer/>
    </>
  );
}