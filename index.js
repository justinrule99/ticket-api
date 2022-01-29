import express from 'express';
import bodyParser from 'body-parser';

import router from './controllers/main-controller.js';
import {PORT} from "./env.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// TODO: auth middleware

app.use('/', router);

app.listen(PORT);
