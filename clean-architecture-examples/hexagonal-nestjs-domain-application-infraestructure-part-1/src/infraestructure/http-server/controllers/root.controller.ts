import { Controller, Get } from '@nestjs/common';

@Controller()
export class 
RootController {

  @Get()
  root() {
    return {
      app: 'northwind-hexagonal-app',
      developer: 'benjamin'
    }
  }
}
