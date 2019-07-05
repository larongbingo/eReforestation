
export interface INews {
  /**
   * Add a prefix of 'NEWS'
   */
  id?: string;

  headline: string;

  content: string;

  /**
   * A foreign key to the Users Table/Model
   */
  author?: string;
}
