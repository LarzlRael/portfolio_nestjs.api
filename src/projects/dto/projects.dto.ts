import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum ProjectType {
  WEB = 'web',
  APP = 'app',
}

export class ProjectDto {
  @IsEnum(ProjectType)
  projectType: ProjectType;

  @IsNotEmpty()
  @IsString()
  name: string;
  urlProject: string;
  technologies: string;
  urlImageProject: string;

  @IsOptional()
  @IsString()
  repositoryUrl?: string;

  @IsOptional()
  publicId?: string;
}
