import { Model, Table, DataType, Column } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  nickname: string;
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;
  @Column({
    type: DataType.STRING,
  })
  password: string;
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  friends: number[];
  @Column({
    type: DataType.ARRAY,
  })
  roles: string[];
  @Column({
    type: DataType.STRING,
  })
  avatar: string;
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  servers: number[];
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  channels: number[];
}
