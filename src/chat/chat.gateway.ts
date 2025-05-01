import { SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
 } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessageDto } from './dto/chat-message.dto';

@WebSocketGateway({namespace: ['chat']})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  async handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    await client.join(room);
    client.emit('joined', room);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() body: ChatMessageDto,
    @ConnectedSocket() client: Socket): void {
    
    client.emit('message', body.data.message);
    client.broadcast.to(body.room_id).emit("message", body.data.message);
  }
}
