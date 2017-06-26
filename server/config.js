import os from 'os';

let config = () => {
  const PROTOCOL = 'https://';
  let HOST = `${os.hostname().toLowerCase()}`;
  let DEV_PORT = 443;
  let E2E_PORT = 4201;
  let PROD_PORT = 443;

  const serverMessage = function(port) {
    return `Server running at ${PROTOCOL}${HOST}:${port}`;
  };

  return {
    PROTOCOL,
    HOST,
    DEV_PORT,
    E2E_PORT,
    PROD_PORT,
    serverMessage,
  };
};

export default config();
