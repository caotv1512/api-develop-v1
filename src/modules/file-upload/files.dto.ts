import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

import { AutoConvertNumber } from '@shared/pipes/decorator-convert-http-query';

export class ImageUploadDto {
  @ApiProperty({ format: 'binary', required: false })
  image: string;
}

export class EventImageUploadDto {
  @ApiProperty({ format: 'binary', required: false })
  cover: string;

  @ApiProperty({ format: 'binary', required: false })
  banner: string;

  @ApiProperty({ format: 'binary', required: false })
  thumbnail: string;
}

export class FolderTypeParam {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @AutoConvertNumber(FolderTypeParam)
  folder: number;
}
