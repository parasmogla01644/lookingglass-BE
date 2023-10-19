import { Module, Global } from '@nestjs/common';
import { ConfigService } from 'src/core/config.service';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
