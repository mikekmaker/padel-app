import { useState,useEffect } from "react";
import axios from "axios";

export function UseFetch(url, action, body = null, bearer = null) {
  const [dataResponse, setDataResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  console.log("usefetch endpoint destino", url);
  console.log("usefetch bearer", bearer);
  console.log("usefetch body", body);
  console.log("usefetch action", action);
  useEffect(() => {
    const fetchData = async () => {
      console.log("3) iniciando solicitud con axios...")
      setLoading(true);
      setError(null);
      try {
        const headers = {
          'ngrok-skip-browser-warning': 'ngrok-skip-browser-warning',
          'Content-Type': 'application/json',
          'accept': 'application/json',
          ...(bearer && { 'Authorization': `Bearer ${bearer}` })
        };
        const requestBody = (body && typeof body === "object" && !(body instanceof FormData))
          ? JSON.stringify(body)
          : body;
        let response;
        switch (action) {
          case 'NONE': 
            break;
          case 'GET':
            response = await axios.get(url, { headers });
            break;
          case 'POST':
            if (body !== null && body !== undefined) {
                    console.log("esto es lo que envio:");
                    for (let pair of body.entries()) {
                      console.log(`${pair[0]}: ${pair[1]}`);
                    }
                    console.log(body);
                    response = await axios.post(url, requestBody, {
                        headers: headers
                    }
                    );
            }
            break;
          case 'PUT':
            if (body !== null && body !== undefined) {
              console.log("esto es lo que envio:");
              for (let pair of body.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
              }
              console.log(body);
              response = await axios.put(url, requestBody, { headers });
            }
            break;
          case 'DELETE':
            response = await axios.delete(url,{ headers });
            break;
          default:
            throw new Error('Invalid action');
        }
        console.log("4) obtengo datos...");
        setDataResponse(response.data);
        setStatusCode(response.status);
      } catch (err) {
        console.log("4) hubo un error:");
        
        if (err.response) {  // Si el error tiene respuesta con detalle

          console.log("error response:",err.response);
          let message;
          if (err.response.data !== undefined) {
            let errors = err.response.data?.errors;

            //handle gestion api errors
            if(errors !== undefined){
              errors.forEach(err => {
                  message = message + ` en ${err.object} - Campo: ${err.field}, Valor: ${err['rejected-value']}, Mensaje: ${err.message}`;
              });
            }
            
            if (!message) {
              //hanlde reserva api errors
              errors = err.response;
              if(errors.data?.detail && errors.data?.msg){
                message = ` en ${errors.data.detail}: ${errors.data.msg}`
              }else{
                  message = ` en ${JSON.stringify(errors)}`
              }
              console.log("message:", message);
            }

            if(!message) {
              message = err.response?.data;
            }
          }
          
          setError(`Error inesperado: ${message}`);
          setStatusCode(err.response.status);  // Guardar código de error
        } else {
          setError(err.message);  // Errores de red u otros
        }
      } finally {
        setLoading(false);
      }
    };

    if(action !== 'NONE'){
        console.log("2) enviando solicitud asincr\u00F3nica...");
        fetchData();
    }
  }, [url, action, body, bearer]);

  return { dataResponse, statusCode, loading, error };
}
