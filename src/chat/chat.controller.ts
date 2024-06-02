import {
  Controller,
  Post,
  Get,
  Body,
  // Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
// import { ViewMessagesDto } from './dto/view-messages.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller()
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('sendMessage')
  async sendMessage(@Req() req: any, @Body() sendMessageDto: SendMessageDto) {
    const senderId = req.user._id;
    return this.chatService.sendMessage(sendMessageDto, senderId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('viewMessages')
  async viewMessages(@Req() req: any) {
    const senderId = req.user._id;
    return this.chatService.viewMessages(senderId);
  }
}
