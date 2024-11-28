import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { FutureStatus } from 'src/future-status/future-status.model';

interface TagCreationAttrs {
  name: string;
  futureStatusId: number;
}

@Table({ tableName: 'tags' })
export class Tag extends Model<Tag, TagCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ForeignKey(() => FutureStatus)
  @Column({ type: DataType.INTEGER })
  futureStatusId: number;

  @BelongsTo(() => FutureStatus)
  status: FutureStatus;
}
