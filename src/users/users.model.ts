import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  login: string;
  password: string;
  lastName: string;
  firstName: string;
}

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  isAdmin: boolean;
}
