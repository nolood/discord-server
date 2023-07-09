import { Model, Table, DataType, Column } from 'sequelize-typescript';

@Table({ tableName: 'servers' })
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
  })
  users: number[];
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  textChannels: number[];
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  voiceChannels: number[];
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  roles: string[];
  @Column({
    type: DataType.ARRAY(DataType.JSON),
  })
  usersRoles: Array<{ id: number; role: string }>;
}
