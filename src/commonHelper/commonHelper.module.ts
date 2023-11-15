import { Module } from '@nestjs/common';
import { CommonHelperController } from './commonHelper.controller';
import { CommonHelperService } from './commonHelper.service';

@Module({
  controllers: [CommonHelperController],
  providers: [CommonHelperService],
})
export class CommonHelperModule {}
