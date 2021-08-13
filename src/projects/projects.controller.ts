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
} from '@nestjs/common';
import { Response, Request } from 'express';
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
    @Req() req: Request,
    @Res() res: Response,
    @Body() projectDto: ProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ): Response {
    if (req.headers['api_key'] === process.env.API_KEY) {
      this.projectsService.createProject(projectDto, file);
      return res.status(HttpStatus.OK).json({
        ok: true,
        msg: 'New Project created',
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        msg: 'The api key was not provided',
      });
    }
  }
}
