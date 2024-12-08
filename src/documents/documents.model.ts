import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Author } from 'src/authors/authors.model';
import { FutureStatus } from 'src/future-status/future-status.model';
import { Tag } from 'src/tags/tags.model';
import { AuthorsDocuments } from './documents-authors.model';
import { DocumentsTags } from './documents-tags.model';

interface DocumentCreationAttr {
  title: string;
  year: number;
  tags: number[];
  file: string;
  futureStatusId: number;
  authorsIds?: number[];
}

@Table({ tableName: 'documents' })
export class Document extends Model<Document, DocumentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  year: number;

  @Column({ type: DataType.STRING, allowNull: false })
  file: string;

  @BelongsToMany(() => Tag, () => DocumentsTags)
  tags: Tag[];

  @ForeignKey(() => FutureStatus)
  @Column({ type: DataType.INTEGER })
  futureStatusId: number;

  @BelongsTo(() => FutureStatus)
  status: FutureStatus;

  @BelongsToMany(() => Author, () => AuthorsDocuments)
  authors: Author[];
}
