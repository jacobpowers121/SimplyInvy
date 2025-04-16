import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('v1/system')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
