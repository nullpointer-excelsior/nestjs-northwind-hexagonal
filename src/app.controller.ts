import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  root() {
    return {
      app: 'northwind-hexagonal-app',
      developer: 'benjamin'
    }
  }
}
