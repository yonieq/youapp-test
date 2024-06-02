import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from '../../profile/profile.service';
import { getModelToken } from '@nestjs/mongoose';
import { Profile } from '../../profile/profile.schema';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getModelToken(Profile.name),
          useValue: {
            // mock methods here
          },
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // add more tests here
});
