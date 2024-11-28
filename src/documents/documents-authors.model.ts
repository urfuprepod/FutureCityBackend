import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Author } from "src/authors/authors.model";
import { Document } from "./documents.model";

@Table({tableName: 'authors-documents'})
export class AuthorsDocuments extends Model<AuthorsDocuments> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Author)
    @Column({type: DataType.INTEGER})
    authorId: number;

    @ForeignKey(() => Document)
    @Column({type: DataType.INTEGER})
    documentId: number;
}