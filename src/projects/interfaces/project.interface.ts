export interface ProjectModel extends Document {
  projectType: string;
  name: string;
  technologies: string;
  urlProject: string;
  urlImageProject: string;
  repositoryUrl: string;
  isPublic: boolean;
  publicId: string;
}
