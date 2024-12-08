import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { AuthorsDocuments } from 'src/documents/documents-authors.model';
import { Document } from 'src/documents/documents.model';

interface AuthCreationAttrs {
  fullName: string;
  avatarUrl?: string;
  biography?: string;
}

@Table({ tableName: 'authors' })
export class Author extends Model<Author, AuthCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  fullName: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  @Column({ type: DataType.STRING, allowNull: true })
  avatarUrl?: string;

  @BelongsToMany(() => Document, () => AuthorsDocuments)
  documents: Document[];
}
