import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/projects.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getAllProjects() {
    return this.projectsService.getAllProjects();
  }
  @Get('/:type')
  getProjectsByType(@Param('type') type) {
    return this.projectsService.getProjectsByType(type);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  createProject(
    @Body() projectDto: ProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.projectsService.createProject(projectDto, file);
  }
}
