import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { SearchRoomDto } from './dto/search-room.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags("rooms")
@ApiBearerAuth('access-token')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '방 만들기', description: '방을 생성함' })
  @ApiResponse({ status: 200, description: '성공적으로 방을 생성함' })
  async create(@Body() body:CreateRoomDto,@Req() req) {
    return await this.roomService.create(body,req.user.profile.id);
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '방 검색', description: '방을 검색함' })
  @ApiResponse({ status: 200, description: '성공적으로 방을 검색함' })
  async search(@Query() body:SearchRoomDto,@Req() req) {
    return await this.roomService.search(body,req.user.profile.school_name);
  } 

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '참가중인 방 조회', description: '현재 참가중인 방을 조회함' })
  @ApiResponse({ status: 200, description: '성공적으로 방을 조회함' })
  async list(@Req() req:any) {
    return await this.roomService.list(req.user.profile.id);
  } 

  @Post(":room_id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '방 참가', description: '방을 참가함' })
  @ApiResponse({ status: 200, description: '성공적으로 방에 참가함' })
  async join(@Param("room_id") room_id:number, @Req() req:any) {
    return await this.roomService.join(room_id,req.user.profile.id);
  } 

  @Delete(":room_id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '방 나가기', description: '방을 나감' })
  @ApiResponse({ status: 200, description: '성공적으로 방을 나감' })
  async exit(@Param("room_id") room_id:number, @Req() req:any) {
    return await this.roomService.exit(room_id,req.user.profile.id);
  }
}
 