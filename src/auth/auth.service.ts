import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async getUserId(): Promise<string> {
    return 'user-id';
  }

  async register(registerDto: RegisterDto): Promise<any> {
    try {
      const { name, email, password, username } = registerDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({
        name,
        email,
        username,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      if (savedUser) {
        return { success: true, user: savedUser };
      } else {
        return { success: false, message: 'Failed to register user.' };
      }
    } catch (error) {
      // Tangani kesalahan di sini
      return {
        success: false,
        message: 'Failed to register user: ' + error.message,
      };
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const { emailOrUsername, password } = loginDto;

      const user = await this.userModel.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user._id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      // Tangani kesalahan di sini
      throw new UnauthorizedException(
        'Failed to authenticate: ' + error.message,
      );
    }
  }

  async validateUserByJwt(payload: any): Promise<User> {
    return this.userModel.findById(payload.sub);
  }
}
