import { Model, Table, DataType, Column } from 'sequelize-typescript';

@Table({ tableName: 'channels' })
export class VoiceChannels extends Model<VoiceChannels> {
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
  })
  messages: Array<{ user: number; message: string; date: string }>;
}
