import 'dotenv/config';
import 'reflect-metadata';
import './config/setupTsyringe';
import bodyparser from 'body-parser';
import express from 'express';
import { engine } from 'express-handlebars';

import healthCheck from './routes/healthCheck';
import isReady from './routes/isReady';
import mostBusyPorts from './routes/ports';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = express();
  app.use(
    bodyparser.urlencoded({
      extended: true,
    })
  );

  app.use(healthCheck()).use(isReady()).use(mostBusyPorts());

  app.engine('handlebars', engine());
  app.set('view engine', 'handlebars');
  app.set('views', './src/views');

  app.listen(PORT);

  process.on('uncaughtException', (error) => {
    console.log('Unhandled NODE exception', error);
  });

  console.log(
    `Running a portchain-code-challenge server at http://localhost:${PORT}`,
    {}
  );

  // build tsyringe container
}

bootstrap();
