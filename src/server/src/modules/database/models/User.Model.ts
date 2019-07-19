import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  PrimaryKey,
} from "sequelize-typescript";
import { hash, compare } from "bcrypt";
import { generate, GenerateOptions } from "randomstring";

import { IUser } from "../../../../../interfaces/models/IUser";

@Table({
  tableName: "users",
  paranoid: true,
  timestamps: true,
})
export class User extends Model<User> implements IUser {
  //#region Class Properties
  private static idGenerationOptions: GenerateOptions = {
    charset: "numeric",
    length: 15,
  };

  private static idGenerationTemplate: (id: string) => string = id =>
    `${new Date().getFullYear()}${id}`;
  //#endregion End Class Properties

  //#region Class Methods
  @BeforeCreate
  @BeforeUpdate
  private static async isUsernameUnique(instance: User) {
    const sameUsername = await this.findAll({
      where: { username: instance.username },
    });

    if (sameUsername.length !== 0) {
      throw new Error(`${instance.username} is already used`);
    }
  }

  @BeforeCreate
  @BeforeUpdate
  private static async hashPassword(instance: User) {
    if (instance.password !== instance.previous("password")) {
      instance.password = await hash(instance.password, 12);
    }
  }

  @BeforeCreate
  private static async generateUniqueId(instance: User) {
    let user: User;
    let id: string;

    do {
      id = this.idGenerationTemplate(generate(this.idGenerationOptions));
      user = await User.findOne({ where: { id } });
      if (!user) {
        instance.id = id;
      }
    } while (user);
  }

  public static setIdGenerationTemplate(templateFn: (id: string) => string) {
    this.idGenerationTemplate = templateFn;
  }

  public static setIdGenerationOptions(options: GenerateOptions) {
    this.idGenerationOptions = options;
  }
  //#endregion End Class Methods

  //#region Model Columns
  @PrimaryKey
  @Column(DataType.STRING)
  public id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public username: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public password: string;
  //#endregion End Model Columns

  //#region Instance Methods
  public async checkPassword(password: string) {
    return compare(password, this.password);
  }
  //#endregion End Instance Methods
}
