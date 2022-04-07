import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FileUploadConfig } from './file-upload.config';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [ConfigModule.forFeature(FileUploadConfig)],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
