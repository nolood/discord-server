import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, DataType, Column } from 'sequelize-typescript';

@Table({ tableName: 'channels' })
export class Channel extends Model<Channel> {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: [1, 2], description: 'Массив Id пользователей' })
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  users: number[];
  @ApiProperty({
    example: [
      {
        user: 1,
        message: 'Привет',
        date: '1896456452342',
        id: '8FDSF-342434-FSDFD',
      },
    ],
    description: 'Массив сообщений',
  })
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    defaultValue: [],
  })
  messages: Array<{ user: number; message: string; date: string; id: string }>;
}
