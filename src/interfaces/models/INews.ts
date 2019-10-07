
/**
 * The details of a news article
 */
export interface INews {

  /**
   * Add a prefix of 'NEWS'
   */
  id?: string;

  /**
   * File name of the feature image
   */
  featureImage?: string;

  /**
   * The title of the article
   */
  headline: string;

  /**
   * The news itself
   */
  content: string;

  /**
   * The date and time the article was created
   */
  createdAt?: string;

  /**
   * A foreign key to the Users Table/Model
   */
  author?: string;

}
