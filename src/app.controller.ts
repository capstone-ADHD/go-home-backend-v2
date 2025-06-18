import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return { status: true, message: "hello nest!!" };
  }

  @Get('schools')
  @ApiOperation({ summary: '학교 이름 검색', description: 'school_name을 포함하는 이름의 학교 리스트를 반환' })
  @ApiResponse({ status: 200, description: '리스트 불러오기 성공' })
  @ApiResponse({ status: 404, description: '해당하는 이름을 찾을 수 없음' })
  async getSchoolName(@Query('school_name') name: string) {
    return await this.appService.getShcoolName(name);
  }
}