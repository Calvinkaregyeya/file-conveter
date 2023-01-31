import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import 'babel-polyfill';
import fs from 'fs';
import logger from 'morgan';
import http from 'http';
import https from 'https';

import globalErrorHandler from './controller/errorController';
import routes from './routes';

dotenv.config({ path: './.env' });
const privateKey = fs.readFileSync('certs/server.key', 'utf8');
const certificate = fs.readFileSync('certs/server.crt', 'utf8');
const ca = fs.readFileSync('certs/bundle.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: ca };

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(logger('dev'));
app.use(cookieParser());

app.disable('x-powered-by');

app.set('trust proxy', true);

app.get('/api', (req, res) => res.json({ status: 'success', message: 'Welcome to the Online SEMA Dashboard API!!!' }));

app.use('/api/pdfFileConverter', routes.pdfFileConverter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(globalErrorHandler);

let server = '';

if (process.env.HOST !== 'localhost') {
  server = https.createServer(credentials, app);
} else {
  server = http.createServer(app);
}

server.listen(PORT, () => {
  console.log(`Server listening at http://${server.address().address}:${server.address().port}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Finished all requests');
  });
});

process.on('exit', () => {
  server.close(() => {
    console.log('Finished all requests');
  });
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
