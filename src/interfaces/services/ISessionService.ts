
export const ISessionService = "ISessionService";
export interface ISessionService {
  createSession(userId: string, reqMetadata: {userAgent: string, ipAddress: string}): Promise<string>;
  destroySession(token: string): Promise<boolean>;
  validateSession(token: string): Promise<string>;
}
