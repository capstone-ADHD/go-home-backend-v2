import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService:ChatService){}

    // @Get('push')
    // async testGet() {
    //     return await this.chatService.sendPushMultiUser(1, "admin", "test");
    // }

    @Get(':room_id')
    @ApiOperation({ summary: '채팅 내역 출력', description: 'room_id에 해당하는 채팅방의 채팅 내역을 출력' })
    @ApiResponse({ status: 200, description: '채팅 내역 출력' })
    async getChats(@Param('room_id') room_id: string) {
        return await this.chatService.getChats(room_id);
    }
}
