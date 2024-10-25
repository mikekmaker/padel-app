const environment = process.env.REACT_APP_ENVIRONMENT || 'desarrollo';
const boApiPrefix = process.env.REACT_APP_BO_API_PREFIX || 'http://localhost:8080/api';
const beApiPrefix = process.env.REACT_APP_BE_API_PREFIX || 'http://localhost:8181';
const version = process.env.REACT_APP_VERSION || '1.0';

export const Config = {
    environment,
    boApiPrefix,
    beApiPrefix,
    version,
};
