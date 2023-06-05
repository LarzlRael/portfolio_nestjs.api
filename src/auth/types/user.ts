export interface User extends Document {
  readonly username: string;
  readonly password: string;
}
