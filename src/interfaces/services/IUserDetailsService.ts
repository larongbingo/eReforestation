import { IUserDetails } from "../models/IUserDetails"; 

export const IUserDetailsService = "IUserDetailsService";
export interface IUserDetailsService {
  getDetails(id: string): Promise<IUserDetails | null>;
  
  updateDetails(newDetails: Partial<IUserDetails>, id: string): Promise<IUserDetails | null>;

  createDetails(newDetails: IUserDetails, id: string): Promise<IUserDetails | null>;
}