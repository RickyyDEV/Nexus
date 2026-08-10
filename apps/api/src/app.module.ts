import { Module } from '@nestjs/common';
import { AuthModule } from 'node_modules/@thallesp/nestjs-better-auth/dist';
import auth from './auth/auth';
import { controllers, services } from './routes/routes';

@Module({
  imports: [
    AuthModule.forRoot({
      auth,
      bodyParser: {
        json: { limit: '2mb' },
        urlencoded: { limit: '2mb', extended: true },
        rawBody: true,
      },
    }),
  ],
  controllers,
  providers: services,
})
export class AppModule {}
