import { Test, TestingModule } from '@nestjs/testing';
import { ClosetController } from './closet.controller';
import { ClosetService } from './closet.service';

describe('ClosetController', () => {
  let controller: ClosetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClosetController],
      providers: [ClosetService],
    }).compile();

    controller = module.get<ClosetController>(ClosetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
