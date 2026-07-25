import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DEFAULT_PORT = 3000;
const DEFAULT_CORS_ORIGIN = 'http://localhost:3001';

const parseOrigins = (origins: string): string[] =>
  origins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableCors({
    origin: parseOrigins(
      config.get<string>('CORS_ORIGIN') ?? DEFAULT_CORS_ORIGIN,
    ),
    methods: ['GET'],
  });

  await app.listen(config.get<string>('PORT') ?? DEFAULT_PORT);
}

void bootstrap();
