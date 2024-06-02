import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly gender: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly birthday: Date;

  @IsOptional()
  @ApiProperty()
  readonly age?: number;

  @IsOptional()
  @ApiProperty()
  readonly horoscope?: string;

  @IsOptional()
  @ApiProperty()
  readonly zodiac?: string;

  @IsOptional()
  @ApiProperty()
  readonly height?: number;

  @IsOptional()
  @ApiProperty()
  readonly weight?: number;

  @IsOptional()
  @ApiProperty()
  readonly image?: string;

  @IsOptional()
  @ApiProperty()
  readonly about?: string;

  @IsOptional()
  @ApiProperty()
  readonly interest?: Record<string, any>;
}
