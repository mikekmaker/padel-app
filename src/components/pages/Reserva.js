import React, { useState, useEffect } from 'react';
import { UseFetch } from '../../UseFetch';
import { Config } from '../../config';
import './Forms.css';

export default function ReservaForm() {
  const [formData, setFormData] = useState({
    reserva_id: '', 
    cancha_id: '',
    usuario_id: '', 
    horario_id: '', 
    descripcion: '', 
    num_personas: ''
  });

  const [submitAction, setSubmitAction] = useState(null);  // Track submission action
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Using the UseFetch hook to make API calls
  //reserva crear
  let url = `${Config.beApiPrefix}/reserva`;
  const { dataResponse, statusCode, loading, error } = UseFetch(
    url,
    submitAction,
    submitAction === 'POST' ? formData : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state
    setSubmitAction('POST');  // Trigger POST request
  };
  
  // Monitor API response after submission
  useEffect(() => {
    if (!loading && isSubmitting) {
      if (statusCode === 201) {
        alert('Reserva creada exitosamente!');
      } else if (error) {
        alert(`Error al crear reserva: ${error}`);
      }
      setIsSubmitting(false); // Reset submitting state
    }
  }, [loading, statusCode, error, isSubmitting]);

  return (
    <div className="hero-container">
      <h3 className="sign-up">Reservar Cancha</h3>
      <form onSubmit={handleSubmit} className="hero-container">
        {/* Hidden Fields */}
        <input type="hidden" name="reserva_id" value={formData.reserva_id} />
        <input type="hidden" name="usuario_id" value={formData.usuario_id} />

        <div className="form-group">
          <label htmlFor="cancha_id">Cancha</label>
          <select 
            name="cancha_id" 
            value={formData.cancha_id} 
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una cancha</option>
            <option value="1">Cancha 1</option>
            <option value="2">Cancha 2</option>
            <option value="3">Cancha 3</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="horario_id">Horario</label>
          <input 
            type="text" 
            name="horario_id" 
            value={formData.horario_id} 
            readOnly 
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <input 
            type="text" 
            name="descripcion" 
            value={formData.descripcion} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="num_personas">Número de Personas</label>
          <input 
            type="number" 
            name="num_personas" 
            value={formData.num_personas} 
            onChange={handleChange} 
            required 
            min="1" 
          />
        </div>

        <button type="submit" className="btn btn--outline btn--large">
          Guardar
        </button>
      </form>
    </div>
  );
}


// import React, { useState, useEffect } from 'react';
// import { Button } from '../Button';
// import '../../App.css';
// import dayjs from 'dayjs';
// import "dayjs/locale/es";
// import { UseFetch } from '../../UseFetch';
// import { Config } from '../../config';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import WeatherForecast from '../Weatherforecast';
// import Footer from '../Footer';

// dayjs.locale("es");

// export default function Reserva() {

//   //JSON horarios detalle (reserva)
//   let url = `${Config.beApiPrefix}/reserva`;
//   let model = null;
//   const [action,setAction] = useState('NONE');
//   console.log(url);
//   const {dataResponse, loading, error} = UseFetch(url, action, model);
//   const [events, setEvents] = useState([]);
//   const handleFetchItems = async () => {
//     setAction('GET');
//   }

//   //fetch reserva
//   useEffect(() => {
//     console.log('Response Data:', dataResponse);
//     console.log("CARGANDO?");
//     console.log('Loading:', loading);
//     console.log("QUE ERROR DEVUELVE USEFETCH?");
//     console.log(error);

//     if (loading) {
//       toast.info('Loading...', {autoClose: 500,});
//     }
//     else
//     {
//       if (error) {
//         toast.error(`${eventError}: ${error}`, {autoClose: 2000,});
//       }
//       else
//       {
//         if (dataResponse) {
//           toast.success(`${eventOk}`, {autoClose: 1500,});
//           console.log("tengo datos!!")
//           console.log(dataResponse);
//           //handleDataFetched(dataResponse); mostar reserva en pantalla
//         }
//       }
//     }
//   }, [dataResponse,loading, error]);

//    //mensajes
//    const eventOk = "Reserva creada exitosamente";
//    const eventUpd = "Reserva actualizada exitosament";
//    const incompleteFieldsError = "Por favor, complete todos los campos obligatorios.";
//    const mandatoryFieldMsg = "Este campo es obligatorio";
//    const eventError = "Se produjo un error";

//   // Ejemplo de dato seleccionado a mostrar
//   const jsonData = {
//     start:"2024-08-30T19:45:00",
//     end: "2024-08-30T20:45:00",
//     id: 1,
//     title: "Prueba eventos",
//     hours: -3
//   };

//   // State to hold the calculated datetime
//   const [datetime, setDatetime] = useState('');
//   // Function to add hours to a datetime string
//   const addHours = (start, hours) => {
//     const date = new Date(start);
//     date.setHours(date.getHours() + hours);
//     return date.toISOString().slice(0, 16); // format as "YYYY-MM-DDTHH:MM"
//   };
//   useEffect(() => {
//     // Calculate the new datetime by adding the hours
//     const calculatedDateTime = addHours(jsonData.start, jsonData.hours);
//     setDatetime(calculatedDateTime);
//   }, [jsonData.start, jsonData.hours]);

//   return (
//   <>
//   <div className='hero-container'>
//       <h2 className='sign-up'>RESERVA</h2>
//       <div className='hero-container'>
//         <div className="app-container">
//           <WeatherForecast/>
//         </div>
//       </div>
//        <input
//         type="datetime-local"
//         value={datetime}
//         onChange={(e) => setDatetime(e.target.value)}
//        />
//         <div className='hero-btns'>
//           <Button
//             className='btns'
//             buttonStyle='btn--outline'
//             buttonSize='btn--large'
//             linkTo='/acreditarme'
//           >
//             Guardar <i className='fa fas fa-save' />
//           </Button>
//           <Button
//             className='btns'
//             buttonStyle='btn--outline'
//             buttonSize='btn--large'
//             linkTo='/limpiar'
//           >
//             Limpiar <i className='fa fas fa-refresh' />
//           </Button>
//         </div>
//     </div>
//     <ToastContainer />
//     <Footer/>
//     </>
// );
// }