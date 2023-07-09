import { Model, Table, DataType, Column } from 'sequelize-typescript';

@Table({ tableName: 'server' })
export class Server extends Model<Server> {
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
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    defaultValue: [],
  })
  textChannels: number[];
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    defaultValue: [],
  })
  voiceChannels: number[];
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  roles: string[];
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    defaultValue: [],
  })
  usersRoles: Array<{ id: number; role: string }>;
}
