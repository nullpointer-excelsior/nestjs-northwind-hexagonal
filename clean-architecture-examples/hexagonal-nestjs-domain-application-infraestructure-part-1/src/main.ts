import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerConfig } from './infraestructure/shared/config/server.config';

function getServerConfig(app: INestApplication): ServerConfig {
  const config: ConfigService = app.get(ConfigService)
  return config.get<ServerConfig>('server')
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = getServerConfig(app)
  await app.listen(config.port);
}
bootstrap();
