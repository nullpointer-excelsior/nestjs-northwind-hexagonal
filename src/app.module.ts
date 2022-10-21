import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InfraestructureModule } from './infraestructure/infraestructure.module';

@Module({
  imports: [
    InfraestructureModule
  ],
  controllers: [AppController],
})
export class AppModule { }
