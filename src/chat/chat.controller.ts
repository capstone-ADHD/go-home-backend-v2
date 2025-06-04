import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService:ChatService){}

    @Get(':room_id')
    async getChats(@Param('room_id') room_id: string) {
        return await this.chatService.getChats(room_id);
    }
}
