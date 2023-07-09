import { Model, Table, DataType, Column } from 'sequelize-typescript';

@Table({ tableName: 'voice-channels' })
export class VoiceChannel extends Model<VoiceChannel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    defaultValue: [],
  })
  users: number[];
}
