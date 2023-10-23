import { Module } from '@nestjs/common';

import { FileController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  providers: [FilesService],
  controllers: [FileController],
  exports: [FilesService],
})
export class FileModule {}
