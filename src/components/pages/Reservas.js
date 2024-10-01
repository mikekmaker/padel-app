import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import '../../App.css';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { UseFetch } from '../../UseFetch';
import { Config } from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

dayjs.locale("es");

export default function Reservas() {
  //Big Calendar Configuration
  const messages = {
    allDay: "Todo el dia",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "Sin eventos"
  };

  const localizer = dayjsLocalizer(dayjs);

  //end Big Calendar Configuration

  //JSON horarios reservados
  let url = `${Config.beApiPrefix}/horariosreservas`;
  let model = null;
  const [action,setAction] = useState('NONE');
  console.log(url);
  const {dataResponse, loading, error} = UseFetch(url, action, model);
  const [events, setEvents] = useState([]);
  const handleFetchItems = async () => {
    console.log("1) enviando peticion al server...")
    setAction('GET');
  }

   // Function to map the array and set events
  // Map the array to the format expected by react-big-calendar
  const handleDataFetched = (items) => {
    const mappedEvents = items.map(item => ({
      title: item.reserva ? item.reserva.descripcion : "Libre para reservar", // Check if reserva exists
      start: new Date(`${item.fecha}T${item.hora}`),
      end: new Date(`${item.fecha}T${parseInt(item.hora.split(':')[0]) + 1}:00`), // Assuming 1 hour duration
      resource: item.reserva || {} // If no reserva, use an empty object or fallback data
    }));

    setEvents(mappedEvents);
  }
  //fetch reservas
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
        console.log("tengo datos!!")
        console.log(dataResponse);
        handleDataFetched(dataResponse);
      }
    }
  }, [dataResponse,loading, error]);

   //mensajes
   const eventOk = "Horarios actualizados exitosamente";
   //const incompleteFieldsError = "Por favor, complete todos los campos obligatorios.";
   //const mandatoryFieldMsg = "Este campo es obligatorio";
   const eventError = "Se produjo un error inesperado!";

  // Ejemplo de dato seleccionado a mostrar
  const jsonData = {
    start:"2024-08-30T19:45:00",
    end: "2024-08-30T20:45:00",
    id: 1,
    title: "Prueba eventos",
    hours: -3
  };

  // State to hold the calculated datetime
  const [datetime, setDatetime] = useState('');
  // Function to add hours to a datetime string
  const addHours = (start, hours) => {
    const date = new Date(start);
    date.setHours(date.getHours() + hours);
    return date.toISOString().slice(0, 16); // format as "YYYY-MM-DDTHH:MM"
  };
  useEffect(() => {
    // Calculate the new datetime by adding the hours
    const calculatedDateTime = addHours(jsonData.start, jsonData.hours);
    setDatetime(calculatedDateTime);
  }, [jsonData.start, jsonData.hours]);

  return (
  <>
  <div className='hero-container'>
      <h2 className='sign-up'>RESERVAS</h2>
      <div className='hero-container'>
      <div>
        <button onClick={handleFetchItems}>Fetch Items</button>
      </div>
          <div className="app-container">
          <Calendar 
          localizer={localizer}
          messages={messages}
          events={events}
          defaultView="agenda"
          toolbar={true}
          style={{width:"70vw", height:"95vh",}} />
        </div>
      </div>
       <p>Seleccione la fecha y hora del evento</p>
       <input
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
       />
        <div className='hero-btns'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
            linkTo='/acreditarme'
          >
            Guardar <i className='fa fas fa-save' />
          </Button>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
            linkTo='/limpiar'
          >
            Limpiar <i className='fa fas fa-refresh' />
          </Button>
          <h3 className='sign-up'>TEMPERATURA ACTUAL 25&#176;C</h3>
        </div>
    </div>
    <ToastContainer /></>
);
}
