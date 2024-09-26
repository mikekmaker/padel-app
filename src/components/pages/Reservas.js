import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import '../../App.css';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs';
import "dayjs/locale/es";

dayjs.locale("es");

export default function Reservas() {

  //mock JSON reserva

  
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
