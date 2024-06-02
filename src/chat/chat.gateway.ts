// import {
//   WebSocketGateway,
//   WebSocketServer,
//   SubscribeMessage,
//   MessageBody,
//   ConnectedSocket,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { ChatService } from './chat.service';
// import { SendMessageDto } from './dto/send-message.dto';
// import { JwtService } from '@nestjs/jwt';

// @WebSocketGateway()
// export class ChatGateway {
//   @WebSocketServer()
//   server: Server;

//   constructor(
//     private chatService: ChatService,
//     private jwtService: JwtService,
//   ) {}

//   @SubscribeMessage('sendMessage')
//   async handleMessage(
//     @MessageBody() sendMessageDto: SendMessageDto,
//     @ConnectedSocket() client: Socket,
//   ): Promise<void> {
//     const token = client.handshake.auth.token;
//     const { userId } = this.jwtService.verify(token);
//     const message = await this.chatService.sendMessage(sendMessageDto, userId);
//     this.server.emit('newMessage', message);
//   }
// }
