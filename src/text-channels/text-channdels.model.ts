import { Model, Table, DataType, Column } from 'sequelize-typescript';

@Table({ tableName: 'TextChannels' })
export class TextChannels extends Model<TextChannels> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.ARRAY(DataType.JSON),
  })
  messages: Array<{ user: number; message: string; date: string }>;
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  users: number[];
}
