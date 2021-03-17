import http from 'http';

const environment = process.env.NODE_ENV || 'development';
let PORT: number = 8091;
switch(environment.trim().toLowerCase()) {
    case 'production':
        PORT = 8888;
        break;
    case 'development':
    default:
        PORT = 8080;
        break;
}

//  SSSS EEEEE RRRR  V   V IIIII DDDD   OOO  RRRR
// S     E     R   R V   V   I   D   D O   O R   R
//  SSS  EEE   RRRR  V   V   I   D   D O   O RRRR
//     S E     R   R  V V    I   D   D O   O R   R
// SSSS  EEEEE R   R   V   IIIII DDDD   OOO  R   R

import app from './app';
let httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    const url = `http://0.0.0.0:${PORT}`;
    console.info('===========================================');
    console.info('Listening at: ', url);
    console.info('Running in: ', environment);
    console.info('Root folder: ', __dirname);
    console.info('===========================================');
});
