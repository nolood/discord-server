import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'nolood', description: 'Уникальный nickname' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  nickname: string;

  @ApiProperty({ example: 'nolood@gmail.com', description: 'Уникальный email' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @ApiProperty({ example: [3, 2, 5], description: 'Массив ID друзей' })
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    defaultValue: [],
  })
  friends: number[];

  @ApiProperty({ example: ['USER', 'ADMIN'], description: 'Массив ролей' })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: ['USER'],
  })
  roles: string[];

  @ApiProperty({ example: '/cat.webp', description: 'Путь до фотографии' })
  @Column({
    type: DataType.STRING,
  })
  avatar: string;

  @ApiProperty({
    example: [1, 5, 2],
    description: 'Массив ID серверов в которых состоит пользователь',
  })
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    defaultValue: [],
  })
  servers: number[];

  @ApiProperty({ example: [1, 5, 2], description: 'Массив ID каналов связи' })
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    defaultValue: [],
  })
  channels: number[];

  @ApiProperty({
    example: [{ senderId: 1, senderNick: 'nolood' }],
    description: 'Массив с данными об отправителе заявки',
  })
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    defaultValue: [],
  })
  requests: Array<{ senderId: number; senderNick: string }>;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Массив с id заблокированных пользователей',
  })
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    defaultValue: [],
  })
  blockedUsers: number[];

  @ApiProperty({
    example: 'adsda3234asdasda',
    description: 'Рефреш токен',
  })
  @Column({
    type: DataType.STRING,
  })
  refreshToken: string;
  @ApiProperty({
    example: 'online',
    description: 'online | offline | invisible | inactive | disturb',
  })
  @Column({
    type: DataType.STRING,
    defaultValue: 'offline',
  })
  status: string;
}
