import { Table, Column, DataType, Model, HasMany } from "sequelize-typescript";
import { Tag } from "src/tags/tags.model";
import { User } from "src/users/users.model";


@Table({ tableName: 'futureStatus', timestamps: false })
export class FutureStatus extends Model<FutureStatus, {name: string}> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => Tag)
  tags: Tag[];

}