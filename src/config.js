const environment = process.env.REACT_APP_ENVIRONMENT || 'desarrollo';
const boApiPrefix = process.env.REACT_APP_BO_API_PREFIX || 'https://114-181-171-103-188.ngrok-free.app/api';
const beApiPrefix = process.env.REACT_APP_BE_API_PREFIX || 'https://1d49-38-253-66-253.ngrok-free.app';
const version = process.env.REACT_APP_VERSION || '1.0';

export const Config = {
    environment,
    boApiPrefix,
    beApiPrefix,
    version,
};
