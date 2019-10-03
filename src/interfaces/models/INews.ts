
export interface INews {
  /**
   * Add a prefix of 'NEWS'
   */
  id?: string;

  /**
   * Name of the image from Gallery Model
   */
  featureImage: string;

  headline: string;

  content: string;

  createdAt?: string;

  /**
   * A foreign key to the Users Table/Model
   */
  author?: string;
}
