import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import { UploadFolderName } from '@constants/api.constants';
import { EEnvType } from '@constants/env.type';

import { httpBadRequest } from '@shared/exceptions/http-exception';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}

  async uploadPublicFileS3(
    dataBuffer: Buffer,
    filename: string,
    folder: number,
  ) {
    if (!UploadFolderName[folder]) {
      httpBadRequest();
    }
    const uploadResult = await this.getS3()
      .upload({
        Bucket: this.configService.get(EEnvType.S3_BUCKET),
        Body: dataBuffer,
        Key: `${UploadFolderName[folder] || ''}${uuid()}-${filename}`,
        ACL: 'public-read',
      })
      .promise();
    return {
      key: this.configService.get(EEnvType.END_POINT_MEDIA) + uploadResult.Key,
    };
  }

  async uploadMultiplePublicFileS3(
    files: { dataBuffer: Buffer; filename: string; key: string }[],
  ) {
    const uploadResult = await Promise.all(
      files.map(file =>
        this.getS3()
          .upload({
            Bucket: this.configService.get(EEnvType.S3_BUCKET),
            Body: file.dataBuffer,
            Key: `${UploadFolderName[0]}${uuid()}-${file.filename}`,
            ACL: 'public-read',
          })
          .promise(),
      ),
    );
    const result = {};
    for (let i = 0; i < uploadResult.length; i++) {
      result[files[i].key] =
        this.configService.get(EEnvType.END_POINT_MEDIA) + uploadResult[i].Key;
    }
    return result;
  }

  private getS3() {
    return new S3({
      accessKeyId: this.configService.get(EEnvType.S3_ACCESS_KEY),
      secretAccessKey: this.configService.get(EEnvType.S3_SECRET_KEY),
      region: this.configService.get(EEnvType.S3_REGION),
    });
  }
}
