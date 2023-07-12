import { ApiProperty } from '@nestjs/swagger';

export class CreateChannel {
  @ApiProperty({ example: [1, 2], description: 'Массив Id пользователей' })
  readonly users: number[];
}
