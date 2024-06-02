import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly emailOrUsername: string;

  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
