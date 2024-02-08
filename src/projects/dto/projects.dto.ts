import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
} from 'class-validator';

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

  urlImageProject: string;

  @IsArray()
  @IsOptional()
  technologies: string[];

  @IsOptional()
  @IsString()
  repositoryUrl?: string;
  description: string;

  @IsOptional()
  @IsString()
  publicId?: string;

  @IsBoolean()
  isPublic: boolean;
}
