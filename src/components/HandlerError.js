  export const handleNetworkError = (error) => {
    console.error('Network error:', error.message);
    console.log("connection refused or timed out.");
    return 'Server is unreachable. Please try again later.';
  };
  
  export const handleServerError = (error) => {
    const statusCode = error.response.status;
    if (statusCode === 404) {
      return 'Resource not found.';
    } else if (statusCode === 500) {
      return 'Internal server error. Please try again later.';
    } else {
            console.log("error manejable por respuesta del server:");
            console.log("codigo de error:");
            console.log(error.response.status);
            if (error.response) {
              if (error.response.status === 422) {
                // Specific handling for 422 Unprocessable Entity
                console.error('Validation error:', error.response.data);
              } else {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
              }
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
            return `An error occurred: ${statusCode}`;
    }
  };
  
  export const handleError = (error) => {
    if (!error.response) {
      return handleNetworkError(error);
    } else {
      return handleServerError(error);
    }
  };  