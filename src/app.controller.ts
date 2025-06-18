import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return { status: true, message: "hello nest!!" };
  }

  @Get('schools')
  async getSchoolName(@Query('school_name') name: string) {
    return await this.appService.getShcoolName(name);
  }
}