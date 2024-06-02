import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from '../../chat/chat.service';
import { getModelToken } from '@nestjs/mongoose';
import { Message } from '../../chat/chat.schema';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getModelToken(Message.name),
          useValue: {
            // mock methods here
          },
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // add more tests here
});
