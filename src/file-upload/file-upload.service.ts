import { Inject, Injectable } from '@nestjs/common';
import aws from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import { FileUploadConfig, FileUploadConfigType } from './file-upload.config';

@Injectable()
export class FileUploadService {
  private s3: aws.S3;

  constructor(
    @Inject(FileUploadConfig.KEY) private awsConfig: FileUploadConfigType,
  ) {
    this.s3 = new aws.S3({
      credentials: {
        accessKeyId: awsConfig.accessKey,
        secretAccessKey: awsConfig.secret,
      },
      region: awsConfig.region,
    });
  }

  async upload(name: string, file: Buffer) {
    const { Location, Key, Bucket, ETag } = await this.s3
      .upload({
        Bucket: this.awsConfig.bucket,
        ACL: 'public-read',
        Key: `${name}__${uuid()}`,
        Body: file,
      })
      .promise();

    return {
      key: Key,
      bucket: Bucket,
      etag: ETag,
      url: Location,
    };
  }
}
