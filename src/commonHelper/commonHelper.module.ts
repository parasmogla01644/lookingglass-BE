import { Module } from '@nestjs/common';
import { CommonHelperController } from './commonHelper.controller';
import { CommonHelperService } from './commonHelper.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CommonHelperController],
  providers: [CommonHelperService],
})
export class CommonHelperModule {}
