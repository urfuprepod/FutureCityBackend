import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Document } from "./documents.model";
import { Tag } from "src/tags/tags.model";

@Table({tableName: 'documents-tags'})
export class DocumentsTags extends Model<DocumentsTags> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Tag)
    @Column({type: DataType.INTEGER})
    tagId: number;

    @ForeignKey(() => Document)
    @Column({type: DataType.INTEGER})
    documentId: number;
}