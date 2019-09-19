
export const IConfigService = "IConfigService";
export interface IConfigService {
  get(key: string): string;
}
