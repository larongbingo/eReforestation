import { ISession } from "../models/ISession";

export const ISessionModelService = "ISessionModelService";
export interface ISessionModelService {
  createSession(session: ISession): Promise<void>;
  findOneByToken(token: string): Promise<ISession>;
  destroySessionByToken(token: string): Promise<void>;
}
