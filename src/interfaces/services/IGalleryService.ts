
export const IGalleryService = "IGalleryService";
export interface IGalleryService {

  storeImage(imageBuffer: Buffer, originalFileName: string): Promise<string>;

  getAllImagesNames(): Promise<string[]>;

}
