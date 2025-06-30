import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatMessage, ChatMessageSchema } from './schemas/chat-message.schema';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { roomMem } from 'src/room/entities/room-mem.entity';
import { Room } from 'src/room/entities/room.entity';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [
    MongooseModule.forFeature([{ name: ChatMessage.name, schema: ChatMessageSchema }]),
    TypeOrmModule.forFeature([User, roomMem, Room]),
  ],
  controllers: [ChatController],
})
export class ChatModule {}
