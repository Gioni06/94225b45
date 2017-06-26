import fs from 'fs';

const keyFilename = 'cert/private.key';
const crtFilename = 'cert/cert.crt';

const key = fs.readFileSync(keyFilename, 'utf8');
const cert = fs.readFileSync(crtFilename, 'utf8');

export default {
  key,
  cert,
};
