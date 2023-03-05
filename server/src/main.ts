import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
  const serverPort = process.env.SERVER_PORT || 9000;

  const app = await NestFactory.create(AppModule);

  // Configure the WebSockets adapter
  app.useWebSocketAdapter(new IoAdapter(app));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', corsOrigin);
    next();
  });

  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,HEAD,POST',
  });

  await app.listen(serverPort);
}
bootstrap();
