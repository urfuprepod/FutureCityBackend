import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { FutureStatus } from 'src/future-status/future-status.model';

interface UserCreationAttrs {
  login: string;
  password: string;
  lastName: string;
  firstName: string;
}

@Table({ tableName: 'tags' })
export class Tag extends Model<Tag, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @BelongsTo(() => FutureStatus)
  status: FutureStatus;
}
