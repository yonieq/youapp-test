import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../auth/user.schema';
import * as mongoose from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop()
  age: number;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  image: string;

  @Prop()
  about: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  interest: any;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
