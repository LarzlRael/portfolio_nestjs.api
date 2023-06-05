export interface JWtPayload {
  username: string;
  iat?: number;
  exp?: number;
}
