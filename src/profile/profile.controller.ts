import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller()
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createProfile')
  async createProfile(
    @Req() req: any,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    const userId = req.user._id;
    return this.profileService.createProfile(createProfileDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  async getProfile(@Req() req: any) {
    const userId = req.user._id;
    return this.profileService.getProfile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateProfile')
  async updateProfile(
    @Req() req: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const userId = req.user._id;
    return this.profileService.updateProfile(userId, updateProfileDto);
  }
}
