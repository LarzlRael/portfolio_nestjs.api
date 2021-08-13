import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './schema/projects.schema';
import { CloudinaryProvider } from './cloudinary.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Projects', schema: ProjectSchema }]),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, CloudinaryProvider],
  exports: [ProjectsService, CloudinaryProvider],
})
export class ProjectsModule {}
