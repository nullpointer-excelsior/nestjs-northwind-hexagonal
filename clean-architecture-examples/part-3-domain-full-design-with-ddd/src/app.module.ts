import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { InfraestructureModule } from './infraestructure/infraestructure.module';

@Module({
  imports: [CoreModule, InfraestructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
