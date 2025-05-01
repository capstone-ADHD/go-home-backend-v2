import { SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
 } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

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
    @MessageBody() data: { room: string; message: string },
    @ConnectedSocket() client: Socket): void {
    
    client.emit('message', data.message);
    client.broadcast.to(data.room).emit("message", data.message);
  }
}
