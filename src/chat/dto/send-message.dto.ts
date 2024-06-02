import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly senderId: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly receiverId: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly content: string;
}
