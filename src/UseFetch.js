import { useState,useEffect } from "react";
import axios from "axios";

export function UseFetch(url, action, body = null) {
  const [dataResponse, setDataResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getHeaders = {
    "ngrok-skip-browser-warning": "69420",
    'Content-Type': 'application/json',
    'accept':'application/json',
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        switch (action) {
          case 'NONE': 
            break;
          case 'GET':
            console.log("3) iniciando solicitud con axios...")
            response = await axios.get(url, {getHeaders});
            console.log("4) obtengo reservas...");
            console.log(response.data);
            break;
          case 'POST':
            if (body !== null && body !== undefined) {
                    console.log("esto es lo que envio:");
                    for (let pair of body.entries()) {
                      console.log(`${pair[0]}: ${pair[1]}`);
                    }
                    console.log(body);
                    response = await axios.post(url, body, {
                        headers: {
                        'Content-Type': 'application/json',
                        'accept':'application/json'
                        }
                    }
                    );
                    console.log('Response:', response.data);
            }
            break;
          case 'PUT':
            response = await axios.put(url, body);
            break;
          case 'DELETE':
            response = await axios.delete(url);
            break;
          default:
            throw new Error('Invalid action');
        }
        setDataResponse(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if(action !== 'NONE'){
        console.log("2) enviando solicitud asyncrónica...");
        fetchData();
    }
  }, [url, action, body]);

  return { dataResponse, loading, error };
}
