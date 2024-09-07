import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import '../../App.css';
//import { FancyInput } from '../../components/FancyInput';

export default function Reservas() {
    // Example JSON data received
  const jsonData = {
    datetime: "2024-08-30T19:45:00",
    hours: -3
  };

  // State to hold the calculated datetime
  const [datetime, setDateTime] = useState('');

  // Function to add hours to a datetime string
  const addHours = (datetime, hours) => {
    const date = new Date(datetime);
    date.setHours(date.getHours() + hours);
    return date.toISOString().slice(0, 16); // format as "YYYY-MM-DDTHH:MM"
  };

  useEffect(() => {
    // Calculate the new datetime by adding the hours
    const calculatedDateTime = addHours(jsonData.datetime, jsonData.hours);
    setDateTime(calculatedDateTime);
  }, [jsonData.datetime, jsonData.hours]);

  // Example JSON data with available dates and times
  const availableDates = [
    "2024-08-25T10:30:00",
    "2024-08-25T14:00:00",
    "2024-08-26T09:00:00",
    "2024-08-26T13:30:00",
    "2024-08-27T16:00:00",
    "2024-08-28T08:00:00",
    "2024-08-28T12:30:00",
    "2024-08-29T18:00:00",
  ];

  return ( 
  <div className='hero-container'>
      <h3 className='sign-up'>RESERVAS</h3>
        <p className="text-4xl font-medium">Seleccione la fecha y hora del evento</p>
      
      <div className='hero-container'>
          <div className="app-container">
          <h1>Fechas Disponibles</h1>
          <ul className="date-list">
            {availableDates.map((date, index) => (
              <li key={index} className="date-item">
                {new Date(date).toLocaleString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </li>
            ))}
          </ul>
        </div>
      </div>
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
