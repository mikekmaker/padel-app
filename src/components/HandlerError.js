  export const handleNetworkError = (error) => {
    console.error('Error de red:', error.message);
    console.log("conexi\u00F3n rechazada o tiempo de espera agotado.");
    return 'Servidor no alcanzado. Por favor int\u00E9ntelo m\u00E1s tarde.';
  };
  
  export const handleServerError = (error, statusCode) => {
    let errorDetail;
    switch (statusCode) {
      case 400:
          errorDetail = "Error de validaci\u00F3n, uno de los campos no es correcto";
          break;
      case 401:
          errorDetail = "Credenciales no v\u00E1lidas. Por favor, reinicie sesi\u00F3n para continuar.";
          break;
      case 403:
          errorDetail = "No tiene permisos para acceder a este sitio. Contacte al administrador si cree que esto es un error";
          break;
      case 404:
          errorDetail = 'Recurso no encontrado';
          break;
      case 409:
          errorDetail = "Conflicto al procesar la solicitud. Es posible que el recurso ya haya sido creado/modificado.";
          break;
      case 500:
          errorDetail = 'Error interno del servidor. Reintente mas tarde';
          break;
      case 422:
          console.error('Error de validaci\u00F3n de datos', error);
          errorDetail =  'Ocurri\u00F3 un error de validaci\u00F3n de datos.';
          break;
      default:
          console.log("Error no manejable de respuesta del server:");
          console.error('Error status:', statusCode);
          errorDetail =  `Ocurri\u00F3 un error: ${error}`;
    }
    return errorDetail;
  }
  
  export const handleError = (error,statusCode) => {
    if (!statusCode) {
      return handleNetworkError(error);
    } else {
      return handleServerError(error, statusCode);
    }
  };  