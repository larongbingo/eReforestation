
export const ITextsService = "ITextsService";
export interface ITextsService {
  getText(messageType: string): string;
}
