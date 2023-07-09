import { Model, Table, DataType, Column } from 'sequelize-typescript';

@Table({ tableName: 'text-channels' })
export class TextChannel extends Model<TextChannel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    defaultValue: [],
  })
  messages: Array<{ user: number; message: string; date: string }>;
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    defaultValue: [],
  })
  users: number[];
}
