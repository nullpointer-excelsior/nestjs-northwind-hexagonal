import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller()
export class RootController {

  @Get()
  @ApiResponse({ description: 'App root endpoint response'})
  root() {
    return {
      app: 'northwind-hexagonal-app',
      developer: 'benjamin'
    }
  }
}
