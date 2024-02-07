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
    if (!file) {
      const project = new this.projectsModel(projectDto);
      try {
        return await project.save();
      } catch (error) {
        console.log(error);
      }
    }
    let uploadApiResponse: UploadApiResponse;

    const upload = v2.uploader.upload_stream(
      { folder: 'portfolio' },
      async (error, result) => {
        if (error) console.log(error);

        uploadApiResponse = result;
        const project = new this.projectsModel({
          ...projectDto,
          urlImageProject: uploadApiResponse.url,
          publicId: uploadApiResponse.public_id,
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
  async getPublicProyects() {
    return await this.projectsModel.find({
      isPublic: true,
    });
  }
  async getProjectById(idProject: string) {
    return await this.projectsModel.findOne({ _id: idProject });
  }

  async getProjectsByType(projectType: string) {
    return await this.projectsModel
      .find({
        projectType: { $regex: projectType, $options: 'i' },
        isPublic: true,
      })
      .limit(5);
  }

  async deleteProject(idProject: string) {
    return await this.projectsModel.findByIdAndDelete(idProject);
  }

  async updateProject(
    idProject: string,
    projectDto: ProjectDto,
    file: Express.Multer.File,
  ) {
    console.log(projectDto);
    const getProject = await this.projectsModel.findById(idProject);
    if (!getProject) {
      throw new Error('Project not found');
    }
    let uploadApiResponse: UploadApiResponse;
    if (!file) {
      /* update object */
      console.log(projectDto);
      const project = await this.projectsModel.findByIdAndUpdate(idProject, {
        ...projectDto,
      });
      console.log(project);
      return project;
    }
    /* update object with image */
    const upload = v2.uploader.upload_stream(
      { folder: 'portfolio' },
      async (error, result) => {
        if (error) console.log(error);
        await v2.uploader.destroy(getProject.publicId);
        uploadApiResponse = result;
        const project = await this.projectsModel.findByIdAndUpdate(idProject, {
          ...getProject,
          ...projectDto,
          urlImageProject: uploadApiResponse.url,
          publicId: uploadApiResponse.public_id,
        });
        return project;
      },
    );

    toStream(file.buffer).pipe(upload);
  }
}
