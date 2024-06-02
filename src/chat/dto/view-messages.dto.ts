import { IsNotEmpty } from 'class-validator';

export class ViewMessagesDto {
  @IsNotEmpty()
  readonly userId: string;
}
