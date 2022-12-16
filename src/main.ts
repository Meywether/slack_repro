import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(helmet());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.use(cookieParser());

  app.enableCors({ origin: '*' });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(configService.get('server.server_port')).then(() => {
    console.log(`Server listening on port ${configService.get('server.server_port')}`);
  });
}
bootstrap();
