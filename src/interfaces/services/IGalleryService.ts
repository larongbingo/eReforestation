
export const IGalleryService = "IGalleryService";
export interface IGalleryService {

  storeImage(imageBuffer: Buffer, extension: string): Promise<string>;

  getAllImagesNames(): Promise<string[]>;

}
