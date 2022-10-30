import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerBuilder } from './infraestructure/http-server/utils/swagger-builder';
import { ServerConfig } from './infraestructure/shared/config/server.config';

function getServerConfig(app: INestApplication): ServerConfig {
  const config: ConfigService = app.get(ConfigService)
  return config.get<ServerConfig>('server')
}

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  const config = getServerConfig(app)
  
  swaggerBuilder(app)

  await app.listen(config.port);

}
bootstrap();
