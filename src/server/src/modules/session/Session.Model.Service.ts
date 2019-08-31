import { Injectable, Provider } from "@nestjs/common";

import { ISession } from "../../../../interfaces/models/ISession";
import { ISessionModelService } from "../../../../interfaces/services/ISessionModelService";
import { Session } from "../database/models/Session.Model";

@Injectable()
export class SessionModelService implements ISessionModelService {
  
  public async createSession(session: ISession): Promise<void> {
    Session.create(session);
  }
  
  public async findOneByToken(token: string): Promise<ISession> {
    return Session.findOne({where: {token}});
  }

  public async destroySessionByToken(token: string): Promise<void> {
    Session.destroy({where: {token}});
  }

}

export const SessionModelServiceProvider: Provider<SessionModelService> = {
  provide: ISessionModelService,
  useClass: SessionModelService,
};
