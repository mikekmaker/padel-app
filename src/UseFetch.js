import { useState,useEffect } from "react";
import axios from "axios";

export function UseFetch(url, action, body = null) {
  const [dataResponse, setDataResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            response = await axios.get(url);
            break;
          case 'POST':
            if (body !== null && body !== undefined) {
                    response = await axios.post(url, body, {
                        headers: {
                        'Content-Type': 'application/json',
                        'accept':'application/json'
                        }
                    }
                    );
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
        console.log("enviando solicitud asyncrónica...");
        fetchData();
    }
  }, [url, action, body]);

  return { dataResponse, loading, error };
}
