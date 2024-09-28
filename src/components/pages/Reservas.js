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

  //JSON reservas
  let url = `${Config.beApiPrefix}/reservas`;
  let model = null;
  const [action,setAction] = useState('NONE');
  console.log(url);
  const {dataResponse, loading, error} = UseFetch(url, action, model);
  const [items, setItems] = useState([]);

  const handleFetchItems = async () => {
    setAction('GET');
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
      }
    }
    setItems(dataResponse);
  }, [dataResponse,loading, error]);

   //mensajes
   const eventOk = "Usuario registrado correctamente!";
   const incompleteFieldsError = "Por favor, complete todos los campos obligatorios.";
   const mandatoryFieldMsg = "Este campo es obligatorio";
   const eventError = "Se produjo un error inesperado!";
  
  //mock JSON horarios mock
  const horarios = [ 
    {
      horarioId:2,
      fecha: "2024-09-21",
      hora:"T09:00:00", 
      title: "libre para reservar"
    },
    {
      horarioId:3,
      fecha: "2024-09-21",
      hora:"T09:00:00",
      title: "libre para reservar"
    },
    {
      horarioId:4,
      fecha: "2024-09-21",
      hora:"T10:00:00",
      title: "libre para reservar"
    },
    {
      horarioId:5,
      fecha: "2024-09-21",
      hora:"T11:00:00",
      title: "libre para reservar"
    },
    {
      horarioId:6,
      fecha: "2024-09-21",
      hora:"T12:00:00",
      title: "libre para reservar"
    },
    {
      horarioId:7,
      fecha: "2024-09-21",
      hora:"T13:00:00",
      title: "libre para reservar"
    }
  ];

  // Example JSON data received
  const jsonData = {
    start:"2024-08-30T19:45:00",
    end: "2024-08-30T20:45:00",
    id: 1,
    title: "Prueba eventos",
    hours: -3
  };

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

  // State to hold the calculated datetime
  const [datetime, setDateTime] = useState('');

  // Function to add hours to a datetime string
  const addHours = (start, hours) => {
    const date = new Date(start);
    date.setHours(date.getHours() + hours);
    return date.toISOString().slice(0, 16); // format as "YYYY-MM-DDTHH:MM"
  };

  useEffect(() => {
    // Calculate the new datetime by adding the hours
    const calculatedDateTime = addHours(jsonData.start, jsonData.hours);
    setDateTime(calculatedDateTime);
  }, [jsonData.start, jsonData.hours]);

  // Example JSON data with available dates and times
  const events = [
    {
      reservaId: 1,
      title: "Prueba eventos",
      descripcion:"esta reunion es muy importante!!",
      start: dayjs('2024-09-20T19:45:00').toDate(),
      end: dayjs('2024-09-20T20:45:00').toDate()
    }
  ];


  return ( 
  <div className='hero-container'>
      <h2 className='sign-up'>RESERVAS</h2>
      <div className='hero-container'>
      <div>
      <button onClick={handleFetchItems}>Fetch Items</button>
      <ul>
      {items && items.length > 0 ? (
    items.map((item) => (
      <li key={item.id}>{item.descripcion}</li>
    ))
  ) : (
    <li>No items available</li>
  )}
      </ul>
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
        onChange={(e) => setDateTime(e.target.value)}
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
);
}
