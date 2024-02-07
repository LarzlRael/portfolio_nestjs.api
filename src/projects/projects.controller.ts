import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/projects.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getPublicProyects() {
    return this.projectsService.getPublicProyects();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/all_projects')
  getAllProjects() {
    return this.projectsService.getAllProjects();
  }
  @Get('/:type')
  getProjectsByType(@Param('type') type) {
    return this.projectsService.getProjectsByType(type);
  }
  @Get('/get_proyect/:id')
  getProjectById(@Param('id') type) {
    return this.projectsService.getProjectById(type);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  createProject(
    @Body() projectDto: ProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.projectsService.createProject(projectDto, file);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deleteProject(@Param('id') idProject: string) {
    return this.projectsService.deleteProject(idProject);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateProject(
    @Param('id') idProject: string,
    @Body() projectDto: ProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.projectsService.updateProject(idProject, projectDto, file);
  }
}
