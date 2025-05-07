import { SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
 } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessageDto } from './dto/chat-message.dto';
import { ChatService } from './chat.service';
import { ChatModelDto } from './dto/chat-model.dto';

@WebSocketGateway({namespace: ['chat']})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  async handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    await client.join(room);
    client.emit('joined', room);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() body: ChatMessageDto,
    @ConnectedSocket() client: Socket) {

    const doc: ChatModelDto = {
      room_id: body.room_id,
      sender_name: body.data.sender_name,
      message: body.data.message
    };
    this.chatService.saveMessage(doc);
    
    client.emit('message', body.data.message);
    client.broadcast.to(body.room_id).emit("message", body.data.message);
  }
}
