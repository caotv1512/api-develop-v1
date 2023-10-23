import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { MAX_IMAGE_SIZE } from '@constants/api.constants';

import { httpBadRequest } from '@shared/exceptions/http-exception';

import { FolderTypeParam, ImageUploadDto } from './files.dto';
import { IFileUploadData } from './files.interface';
import { FilesService } from './files.service';

function filterImage(req, image, callback) {
  if (!image.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
}

@ApiTags('Files')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FilesService) {}

  @Post('upload-image/:folder')
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: filterImage.bind(this),
      limits: {
        fileSize: MAX_IMAGE_SIZE,
        files: 1,
      },
    }),
  )
  @ApiBody({ type: ImageUploadDto })
  @ApiOkResponse({ type: ImageUploadDto })
  uploadFile(
    @UploadedFile() image: IFileUploadData,
    @Param() param: FolderTypeParam,
  ) {
    if (!image) {
      httpBadRequest();
    }
    return this.fileService.uploadPublicFileS3(
      image.buffer,
      image.originalname,
      param.folder,
    );
  }
}
