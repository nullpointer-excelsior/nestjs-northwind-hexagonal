import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './infraestructure/shared/shared.module';
import { HttpServerModule } from './infraestructure/http-server/http-server.module';
import { AdaptersModule } from './infraestructure/adapters/adapters.module';

@Module({
  imports: [
    SharedModule,
    CoreModule,
    HttpServerModule,
  ]
})
export class AppModule { }
