import axios from "axios";
import { Config } from "../config";

export const isAuthenticated = async () => {
    const token = localStorage.getItem('authToken');
    const idTipoUsuario = localStorage.getItem('idTipoUsuario');
    console.log("autenticando usuario:", token);
    console.log("idTipoUsuario:", idTipoUsuario);
    if (!token || !idTipoUsuario) return false;
  
    try {
        // Send the token to the server for validation
        const response = await axios.post(
            `${Config.boApiPrefix}/validarToken`, // Correct endpoint
            JSON.stringify({ idTipoUsuario }), // Send idTipoUsuario in request body
            {
              headers: {
                'Authorization': `Bearer ${token}`, // Correct header with Bearer token
                'Content-Type': 'application/json',
                'accept':'application/json'
              },
            }
        );
    
        // Check the response from the backend
        if (response.data.isValid) {
            return true;
        } else {
            console.warn('Token no es valido:', response.data.message);
            localStorage.clear(); // Clear storage if token/role is invalid
            return false;
        }

    } catch (error) {
        console.error('Falla inesperada al validar Token:', error);
        localStorage.clear();  // Clear localStorage if validation fails
    return false;
    }
  };
  
export const logout = () => {
    // Remove the token or any user-related information from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('idTipoUsuario');
};