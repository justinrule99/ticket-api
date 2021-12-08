import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import https from 'https';

import router from './controllers/main-controller.js';
import {PORT} from "./env.js";

let privateKey = fs.readFileSync('./CA/localhost/localhost.decrypted.key');
let cert = fs.readFileSync('./CA/localhost/localhost.crt');



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// TODO: auth middleware

app.use('/', router);

const httpsServer = https.createServer({
    key: privateKey,
    cert: cert
}, app);

app.listen(PORT);

// httpsServer.listen(PORT, () => console.log('listening on '+PORT));