import { ApiProperty } from '@nestjs/swagger';

export class SendMessage {
  @ApiProperty({ example: 'Привет', description: 'Текст сообщения' })
  readonly message: string;
  @ApiProperty({ example: '1', description: 'Id пользователя' })
  readonly user: number;
  @ApiProperty({ example: '1', description: 'Id канала' })
  readonly channelId: number;
}
