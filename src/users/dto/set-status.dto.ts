import { ApiProperty } from '@nestjs/swagger';

export class SetStatus {
  @ApiProperty({ example: 2, description: 'Уникальный ID' })
  readonly userId: number;
  @ApiProperty({ example: 'online', description: 'Статус пользователя' })
  readonly status: string;
}
