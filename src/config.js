const environment = process.env.REACT_APP_ENVIRONMENT || 'desarrollo';
const apiPrefix = process.env.REACT_APP_API_PREFIX || 'http://localhost:8181';
const version = process.env.REACT_APP_VERSION || '1.0';

export const Config = {
    environment,
    apiPrefix,
    version,
};
