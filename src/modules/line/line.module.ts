import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LineService } from './line.service';

@Module({
  imports: [ConfigModule],
  exports: [LineService],
  providers: [LineService],
})
export class LineModule {}
