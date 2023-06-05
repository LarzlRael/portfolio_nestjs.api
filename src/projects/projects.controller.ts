import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/projects.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  createProject(
    @Body() projectDto: ProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.projectsService.createProject(projectDto, file);
  }
}
