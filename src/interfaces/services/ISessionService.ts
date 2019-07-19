
export const ISessionService = "ISessionService";
export interface ISessionService {
  createSession(userId: string, reqMetadata: {userAgent: string, ipAddress: string}): string;
  destroySession(token: string): boolean;
  validateSession(token: string): string;
}
