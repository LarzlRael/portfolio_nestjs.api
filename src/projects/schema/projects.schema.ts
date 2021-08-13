import { Schema } from 'mongoose';

export const ProjectSchema = new Schema({
  projectType: String,
  name: String,
  urlProject: String,
  technologies: String,
  urlImageProject: String,
  repositoryUrl: String,
});
