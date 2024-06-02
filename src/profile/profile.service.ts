import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
// import { Multer } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
// import { Multer } from 'multer';

interface UploadedFile {
  originalname: string;
  buffer: Buffer;
}

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    // private authService: AuthService,
  ) {}

  async uploadImage(file: UploadedFile): Promise<string> {
    const imageFolder = path.join(__dirname, '../../upload/image');
    const imageFileName = uuidv4() + path.extname(file.originalname);
    const imagePath = path.join(imageFolder, imageFileName);
    fs.writeFileSync(imagePath, file.buffer);
    return imageFileName;
  }

  async createProfile(
    createProfileDto: CreateProfileDto,
    userId: string,
    file?: UploadedFile,
  ): Promise<{ success: boolean; profile?: Profile; message?: string }> {
    try {
      // Periksa apakah sudah ada profil yang terkait dengan userId
      const existingProfile = await this.profileModel.findOne({ userId });
      if (existingProfile) {
        return {
          success: false,
          message: "Can't create new profile. Please update existing profile.",
        };
      }

      const birthYear = new Date(createProfileDto.birthday).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      // Menyiapkan minat
      const interests = createProfileDto.interest || [];

      // Menyimpan gambar
      const imageFileName = await this.uploadImage(file);

      const profile = new this.profileModel({
        ...createProfileDto,
        userId,
        age,
        image: imageFileName, // Simpan nama gambar dalam profil
        interests,
      });
      const savedProfile = await profile.save();

      if (!savedProfile) {
        throw new Error('Failed to create profile.');
      }

      return { success: true, profile: savedProfile };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create profile: ' + error.message,
      };
    }
  }

  async getProfile(userId: string): Promise<Profile> {
    const result = await this.profileModel
      .findOne({ userId })
      .populate('userId', '-password');

    return result;
  }

  async handleFileUpload(file: UploadedFile): Promise<string> {
    const imageFolder = path.join(__dirname, '../../upload/image');
    if (!fs.existsSync(imageFolder)) {
      fs.mkdirSync(imageFolder, { recursive: true });
    }

    const imageFileName = uuidv4() + path.extname(file.originalname);
    const imagePath = path.join(imageFolder, imageFileName);
    fs.writeFileSync(imagePath, file.buffer);

    return imageFileName;
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
    file?: UploadedFile,
  ): Promise<{ success: boolean; profile?: Profile; message?: string }> {
    try {
      // Lakukan pemetaan pada array interest
      let mappedInterests;
      if (updateProfileDto.interest) {
        mappedInterests = updateProfileDto.interest.map((interest) => {
          return {
            name: interest,
          };
        });
      } else {
        // Jika tidak ada permintaan untuk interest, gunakan nilai dari database
        const existingProfile = await this.profileModel.findOne({ userId });
        if (existingProfile) {
          mappedInterests = existingProfile.interest;
        } else {
          throw new Error('Profile not found for the given user ID.');
        }
      }

      // Menyimpan gambar jika ada
      let image = null;
      if (file) {
        image = await this.handleFileUpload(file);
      }

      // Lakukan update pada profile dengan array interest yang telah dipetakan
      const updatedProfile = await this.profileModel
        .findOneAndUpdate(
          { userId },
          { ...updateProfileDto, interests: mappedInterests, image },
          { new: true },
        )
        .populate('userId', '-password');

      if (!updatedProfile) {
        return {
          success: false,
          message: 'Profile not found for the given user ID.',
        };
      }

      return { success: true, profile: updatedProfile };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update profile: ' + error.message,
      };
    }
  }
}
