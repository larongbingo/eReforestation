
export const IGalleryService = "IGalleryService";
export interface IGalleryService {

  // TODO: Replace params with File Type
  storeImage(imageBuffer: Buffer, originalFileName: string): Promise<string>;

  getAllImagesNames(): Promise<string[]>;

}
