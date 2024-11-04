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
import WeatherForecast from '../Weatherforecast';
import Footer from '../Footer';
import { handleError } from '../HandlerError';
import { useNavigate } from 'react-router-dom';
import './Horarios.css';

dayjs.locale("es");

export default function Horarios() {
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
  const {dataResponse, statusCode, loading, error} = UseFetch(url, action, model);
  const [events, setEvents] = useState([]);
  
  const getItems = async () => {
    console.log("1) enviando peticion al server...")
    setAction('GET');
  }

   // Function to map the array and set events
  // Map the array to the format expected by react-big-calendar
  const handleDataFetched = (items) => {
    const mappedEvents = items.map(item => ({
      id: item.horario_id,
      title: item.reserva ? item.reserva.descripcion : "Libre",
      start: new Date(`${item.fecha}T${item.hora}`),
      end: new Date(`${item.fecha}T${parseInt(item.hora.split(':')[0]) + 1}:00`), // Assuming 1 hour duration
      resource: item.reserva || {} // If no reserva, use an empty object or fallback data
    }));
    setEvents(mappedEvents);
  }

  //style events
  // Custom event styling based on the presence of "reserva"
  const eventPropGetter = (event) => {
    const hasReserva = event.resource?.reserva_id; // Check if resource has "reserva"
  
    const style = {
      backgroundColor: hasReserva ? 'lightcoral' : '#00FF7F', // Light red or tennis-ball green
      borderRadius: '5px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
    };
  
    return { style };
  };

  //redirect
  const navigate = useNavigate();
  const handleSelectEvent = (event) => {
    let exist = event.resource? event.resource.reserva_id : null;
    if (exist) {
      navigate(`/Horarios/${event.id}/Reserva/${exist}`);
    } else {
      console.log("reserva nueva")
      navigate(`/Horarios/${event.id}/Reserva`);
    }
  };


  //fetch horarios
  useEffect(() => {
    console.log('Response Data:', dataResponse);
    console.log("CARGANDO?");
    console.log('Loading:', loading);
    console.log("QUE ERROR DEVUELVE USEFETCH?");
    console.log(error);
    console.log('status:', statusCode);

    if (loading) {
      toast.info('Loading...', {autoClose: 500,});
    }
    else
    {
      if (error) {
        toast.error(`${eventError}: ${handleError(error, statusCode)}`, {autoClose: 2000,});
      }
      else
      {
        if (dataResponse) {
          toast.success(`${eventOk}`, {autoClose: 1500,});
          console.log(dataResponse);
          handleDataFetched(dataResponse);
        }
      }
    }
    getItems();
  }, [dataResponse, statusCode, loading, error]);

   //mensajes
   const eventOk = "Horarios actualizados exitosamente";
   //const incompleteFieldsError = "Por favor, complete todos los campos obligatorios.";
   //const mandatoryFieldMsg = "Este campo es obligatorio";
   const eventError = "Se produjo un error";

  return (
  <>
  <div className='hero-container'>
      <h2 className='sign-up'>HORARIOS</h2>
      <div className='hero-container'>
          <div className="app-container">
          <WeatherForecast/>
          <div className='invisible-spacer'></div>
          <Calendar 
          onSelectEvent={handleSelectEvent}
          localizer={localizer}
          messages={messages}
          events={events}
          defaultView="month"
          toolbar={true}
          eventPropGetter={eventPropGetter}
          style={{width:"70vw", height:"95vh",}} />
        </div>
      </div>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Actualizar <i className='fa fas fa-refresh' />
        </Button>
      </div>
    </div>
    <ToastContainer />
    <Footer/>
    </>
);
}
