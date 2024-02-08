import { Schema } from 'mongoose';

export const ProjectSchema = new Schema({
  projectType: String,
  name: String,
  urlProject: String,
  technologies: [
    {
      type: String,
    },
  ],
  urlImageProject: String,
  repositoryUrl: String,
  description: String,
  isPublic: {
    type: Boolean,
    default: true,
  },
});
