import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './chat.schema';
import { SendMessageDto } from './dto/send-message.dto';
// import { ViewMessagesDto } from './dto/view-messages.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async sendMessage(
    sendMessageDto: SendMessageDto,
    senderId: string,
  ): Promise<{ success: boolean; message?: Message; error?: string }> {
    try {
      const message = new this.messageModel({
        ...sendMessageDto,
        senderId,
      });
      const savedMessage = await message.save();
      if (savedMessage) {
        return { success: true, message: savedMessage };
      } else {
        return { success: false, error: 'Failed to save message.' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async viewMessages(senderId: string): Promise<Message[]> {
    const result = await this.messageModel.find({ senderId });
    return result;
  }
}
