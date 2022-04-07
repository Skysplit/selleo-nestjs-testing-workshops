import { ConfigType, registerAs } from '@nestjs/config';

export const FileUploadConfig = registerAs('fileUpload', () => ({
  accessKey: process.env.AWS_S3_ACCESS_KEY ?? '',
  secret: process.env.AWS_S3_SECRET_KEY ?? '',
  bucket: process.env.AWS_S3_BUCKET ?? '',
  region: process.env.AWS_S3_REGION ?? '',
}));

export type FileUploadConfigType = ConfigType<typeof FileUploadConfig>;
