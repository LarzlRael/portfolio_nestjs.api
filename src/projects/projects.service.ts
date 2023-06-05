import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectModel } from './interfaces/project.interface';
import { ProjectDto } from './dto/projects.dto';
import toStream = require('buffer-to-stream');

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Projects') private projectsModel: Model<ProjectModel>,
  ) {}

  async createProject(projectDto: ProjectDto, file: Express.Multer.File) {
    let uploadApiResponse: UploadApiResponse;

    const upload = v2.uploader.upload_stream(
      { folder: 'portfolio' },
      async (error, result) => {
        if (error) console.log(error);

        uploadApiResponse = result;
        const project = new this.projectsModel({
          ...projectDto,
          urlImageProject: uploadApiResponse.url,
        });

        try {
          return await project.save();
        } catch (error) {
          console.log(error);
        }
      },
    );

    toStream(file.buffer).pipe(upload);
  }

  async getAllProjects() {
    return await this.projectsModel.find();
  }

  async getProjectsByType(projectType: string) {
    return await this.projectsModel
      .find({ projectType: { $regex: projectType, $options: 'i' } })
      .limit(5);
  }
}
