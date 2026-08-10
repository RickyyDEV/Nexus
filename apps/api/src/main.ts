import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    cors: {
      origin: ['http://localhost:5173', 'http://localhost:4173'],
      credentials: true,
    },
  });
  await app.listen(5959);
}
bootstrap();
