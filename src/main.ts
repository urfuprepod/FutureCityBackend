import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response, static as static_ } from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: false});
  app.enableCors({ origin: '*', methods: 'GET, POST, PUT, DELETE', preflightContinue: false, optionsSuccessStatus: 204 });

  app.use(function (request: Request, response: Response, next: NextFunction) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    response.setHeader('Content-Disposition', 'attachment');
    next();
  });
  app.use('/static', static_(join(__dirname, '..', 'static')))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
