import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClosetController } from './closet.controller';
import { ClosetRepository } from './closet.repository';
import { ClosetService } from './closet.service';
import { Category } from './entities/category.entity';
import { Closet } from './entities/closet.entity';
import { MediaService } from './media.service';

@Module({
  imports: [SequelizeModule.forFeature([Closet, Category])],
  controllers: [ClosetController],
  providers: [ClosetService, MediaService, ClosetRepository],
})
export class ClosetModule {}
