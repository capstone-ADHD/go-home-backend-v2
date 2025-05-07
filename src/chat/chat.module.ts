import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatMessage, ChatMessageSchema } from './schemas/chat-message.schema';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [
    MongooseModule.forFeature([{ name: ChatMessage.name, schema: ChatMessageSchema }]),
  ],
  controllers: [ChatController],
})
export class ChatModule {}
