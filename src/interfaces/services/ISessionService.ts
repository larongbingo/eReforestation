import { IUser } from "../models/IUser";

export const ISessionManager = "ISessionManager";
export interface ISessionManager {
  createSession(userId: string, reqMetadata: {userAgent: string, ipAddress: string}): string;
  destroySession(token: string): boolean;
}

export const ISessionValidator = "ISessionValidator";
export interface ISessionValidator {
  validateSession(token: string): string;
}
