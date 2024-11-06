import React, { useState, useEffect,useCallback } from 'react';
import { UseFetch } from '../../UseFetch';
import { Config } from '../../config';
import './Forms.css';
import { FancyInput } from '../../components/FancyInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer';
import { handleError } from '../../components/HandlerError';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

export default function ReservaForm() {

  //redirect
  const navigate = useNavigate();
  // Capturo horario_id y reserva_id de la URL
  const { idHorario, reservaId } = useParams(); 
  // Capturo idUsuario logueado
  const [idUsuario, setIdUsuario] = useState();
  //inicializo variables para manejo de solicitudes
  const [action,setAction] = useState('NONE');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isloading, setLoading] = useState(true);
  const [descripcionHorario,setDescripcionHorario]= useState('');
  const [isReadOnly, setIsReadOnly] = useState(false);

  //inicialización de lista para validación de datos de formulario
  const [errors, setErrors] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState('');

   //mensajes
   const eventOk = "Reserva guardada correctamente!";
   const incompleteFieldsError = "Por favor, complete todos los campos obligatorios.";
   const mandatoryFieldMsg = "Este campo es obligatorio";
   const eventError = "Se produjo un error";
  
  const [formData, setFormData] = useState({
    reserva_id: reservaId || '', 
    cancha_id: '',
    usuario_id: '', 
    horario_id: idHorario || '', 
    fecha: '',
    hora: '',
    descripcion: '', 
    num_personas: ''
  });

   //inicializar opciones de controles
   //TODO: Reemplazarlo por get de API gestion
   const optionsCancha = [
    { value: '1', label: 'Cancha A' },
    { value: '2', label: 'Cancha B' },
    { value: '3', label: 'Cancha C' }
  ];

  //llamada generica
  const { dataResponse, statusCode, loading, error } = UseFetch(
    url,
    action,
    (action === 'POST' || action === 'PUT') ? formData : null
  );

  // // Funcion para traer detalles de horario basado en horario_id
  // const fetchHorarioReserva = async (id) => {
  //   if(id){
  //     console.log("1) armando peticion para enviar al server...")
  //     let urlh = `${Config.beApiPrefix}/horariosreservas`;
  //     let filter = `horario_id=${idHorario}`;
  //     console.log(`${urlh}?${filter}`);
  //     setUrl(`${urlh}?${filter}`);
  //     setAction('GET');
  //   }
  // }
  const fetchHorarioReserva = useCallback((id) => {
    if(id){
      console.log("1) armando peticion para enviar al server...")
      let urlh = `${Config.beApiPrefix}/horariosreservas`;
      let filter = `horario_id=${idHorario}`;
      console.log(`${urlh}?${filter}`);
      setUrl(`${urlh}?${filter}`);
      setAction('GET');
    }
  },[idHorario]);

  // Fetch horario reserva en el evento load
  useEffect(() => {
      setIdUsuario(localStorage.getItem('usuarioId'));
      fetchHorarioReserva(idHorario);
  }, [idHorario,fetchHorarioReserva]);

  useEffect(() => {
    if (dataResponse && isloading) {
      // Extraemos y formateamos el objeto para ajustarse a formData
      const formattedData = {
        reserva_id: dataResponse[0].reserva?.reserva_id || reservaId || '', 
        cancha_id: dataResponse[0].reserva?.cancha?.cancha_id || '', 
        usuario_id: dataResponse[0].reserva?.usuario?.usuario_id || idUsuario || '',
        horario_id: dataResponse[0].horario_id || idHorario || '', 
        fecha: dataResponse[0].fecha || '',
        hora: dataResponse[0].hora || '',
        descripcion: dataResponse[0].reserva?.descripcion || '', 
        num_personas:  dataResponse[0].reserva?.num_personas || ''
      };
      setNumPersonas(formattedData.num_personas);
      setDescripcionHorario(`${formattedData.fecha} ${formattedData.hora}`);
      console.log(formattedData);
      setFormData(formattedData);
      //formatear horario
      console.log('USUARIO local: %d',idUsuario);
      console.log('USUARIO reserva: %d',formattedData.usuario_id);
      const u1 = parseInt(idUsuario, 10);
      const u2 = parseInt(formattedData.usuario_id, 10);
      if (u1 !== u2) {
        setIsReadOnly(true);
        console.log("no puede editar");
      }else{
        console.log("ahora si puede editar");
        setIsReadOnly(false);
      }
      setLoading(false);
    }
    if (error) {
      handleError(error,statusCode);
      setLoading(false);
    }
  }, [dataResponse, statusCode, isloading, error,idHorario,reservaId]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    if (!isReadOnly) {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value || '',}));
      setErrors({ ...errors, [name]: '' });  
    }           
  };

  // UseFetch hook para hacer llamadas a APIs
  //reserva crear
  const upsertReserva = async (action, formData) => {
    setAction('NONE');
    const data = new FormData();
    data.append('reserva_id',formData.reserva_id);
    data.append('cancha_id', formData.cancha_id);
    data.append('usuario_id', formData.usuario_id);
    data.append('horario_id', formData.horario_id);
    data.append('descripcion', formData.descripcion);
    data.append('num_personas', formData.num_personas);
    setFormData(data);
    let target = action === 'POST' ? "reserva" : `reserva\\${formData.reserva_id}`
    console.log("destino");
    console.log(target);
    setUrl(`${Config.beApiPrefix}/${target}`);
    setAction(action);
  }

  // Función para validar el formulario
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.cancha_id) validationErrors.cancha_id = mandatoryFieldMsg;//'Cancha es obligatoria';
    if (!formData.horario_id) validationErrors.horario_id = mandatoryFieldMsg;//'Horario es obligatorio';
    if (!formData.descripcion) validationErrors.descripcion = mandatoryFieldMsg;// 'Descripci\u00F3n es obligatoria';
    if (!formData.num_personas) validationErrors.num_personas = mandatoryFieldMsg;//'N\u00FAmero de personas es obligatorio';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // true si no hay errores
  };

  //eliminación de perfil
  const handleDelete = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirmar eliminaci\u00F3n',
      message: '\u00BFSeguro que quiere eliminar su reserva?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            setUrl(`${Config.beApiPrefix}/reserva/${formData.reserva_id}`);
            setAction('DELETE');
            toast.success('\u00A1Reserva eliminada correctamente!');
            setTimeout(() => navigate('/horarios', { replace: true }), 1500);
          }
        },
        {
          label: 'No',
          onClick: () => toast.info('Eliminaci\u00F3n cancelada.')
        }
      ]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      let action = reservaId === undefined ? 'POST' : 'PUT'
      upsertReserva(action,formData);
    } else {
      setFormErrorMessage(incompleteFieldsError);
    }
  };
  
  // Monitor API response after submission
  useEffect(() => {
    if (loading) {
      toast.info('Loading...', {autoClose: 500,});
    }
    else if(!loading && isSubmitting)
    {
      if (error) {
        toast.error(`${eventError}: ${handleError(error, statusCode)}`, {autoClose: 2000,});
      }
      else{
        if (dataResponse) {
          toast.success(`${eventOk}`, {autoClose: 1500,});
          setTimeout(() => navigate('/horarios', { replace: true }), 1500);
        }
      }
      setIsSubmitting(false);
    }
  }, [loading, statusCode, error, isSubmitting, dataResponse,navigate]);

  

  //manejo de campos numericos
  const [numPersonas, setNumPersonas] = useState('');

   //restricciones en layout
   const limitInput = (e) => {
    let inputValue = e.target.value;

    // me aseguro que valor no es mayor a 2 caracteres
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2);
    }

    // me aseguro que valor no supera el 99
    if (inputValue > 16) {
      inputValue = 16;
    }
    setNumPersonas(inputValue);
  };

  return (
  <>
    <div className="hero-container">
      <h3 className="sign-up">Reservar Cancha</h3>
      <form onSubmit={handleSubmit} className="hero-container form-grid">
        {/* Hidden Fields */}
        <input type="hidden" name="reserva_id" value={formData.reserva_id} />
        <input type="hidden" name="usuario_id" value={formData.usuario_id} />
        <input type="hidden" name="horario_id" value={formData.horario_id} />

        <div className="form-group">
          <h3 className="text-4xl font-medium">Fecha y Hora del Evento</h3>
              <FancyInput label="" placeholder="Fecha y Hora del Evento" type="text" value={descripcionHorario}
                name="descripcionHorario" readOnly="readOnly"/>
        </div>
        <div className="form-group">
            <h3 className="text-4xl font-medium">Descripci&oacute;n</h3>
            <FancyInput label="" placeholder="Descripcion" type="text" value={formData.descripcion}
              name="descripcion"
              className={`fancy-input ${errors.descripcion ? 'fancy-input-error' : ''}`}
              onChange={handleChange} readOnly={isReadOnly} />
              {errors.descripcion && <p className="error">{errors.descripcion}</p>}
        </div>
        <div></div>

        <div className="form-group">
                  <h3 className="text-4xl font-medium">Cancha</h3>
                  <select label="" placeholder="ej: Cancha A" type="text" value={formData.cancha_id}
                    name="cancha_id"
                    className={`fancy-input ${errors.cancha_id ? 'fancy-input-error' : ''}`}
                    onChange={handleChange}>
                    <option value="" disabled>Seleccione Cancha</option>
                    {optionsCancha.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.cancha_id && <p className="error">{errors.cancha_id}</p>}
        </div>
        <div className='form-group'>
            <h3 className="text-4xl font-medium">N&uacute;mero de Personas</h3>
            <FancyInput label="" placeholder="cantidad de jugadores" type="number" min="1" max="16" maxLength="2" onInput={limitInput} value={numPersonas} 
              name="num_personas"
              className={`fancy-input ${errors.num_personas ? 'fancy-input-error' : ''}`}
              onChange={handleChange} readOnly={isReadOnly} />
              {errors.num_personas && <p className="error">{errors.num_personas}</p>}
        </div>
        <div></div>
        <div></div>
        <button type="submit" className="btn btn--outline btn--large" disabled={isReadOnly}>
          Guardar
        </button>
        <button onClick={handleDelete} className="btns btn btn--outline btn--large" disabled={isReadOnly} style={{ zIndex: 2, position: 'relative' }}>Eliminar</button>
        <div></div>
        {formErrorMessage && <div className="floating-error">{formErrorMessage}</div>}
      </form>
    </div>
    <ToastContainer />
    <Footer/>
  </>
  );
}