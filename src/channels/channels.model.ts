import { Model, Table, DataType, Column } from 'sequelize-typescript';

@Table({ tableName: 'channels' })
export class Channel extends Model<Channel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  users: number[];
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    defaultValue: [],
  })
  messages: Array<{ user: number; message: string; date: string }>;
}
