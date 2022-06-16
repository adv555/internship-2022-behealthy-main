import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: `*`,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody()
    payload: { data: string; receiver: number; sender: number | null },
    @ConnectedSocket() client: Socket,
  ) {
    this.server
      .to(payload.receiver.toString())
      .emit('message', { data: payload.data, sender: payload.sender });
    return payload.data;
  }

  @SubscribeMessage('register')
  handleRegister(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    client.join(id.toString());
  }
}
