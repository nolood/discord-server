import { ApiProperty } from '@nestjs/swagger';

export class ChangeMessage {
  @ApiProperty({ example: '123123-3sdfsdf-dasda', description: 'Id сообщения' })
  readonly messageId: string;
  @ApiProperty({ example: 'Привет мир', description: 'Текст нового сообщения' })
  readonly messageText: string;
  @ApiProperty({ example: 1, description: 'Id канала' })
  readonly channelId: number;
}
