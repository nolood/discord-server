import { ApiProperty } from '@nestjs/swagger';

export class DeleteMessages {
  @ApiProperty({
    example: ['dasdsad-aadasd', 'dasdas123-31231'],
    description: 'Массив Id пользователей',
  })
  readonly messageIds: string[];
  @ApiProperty({ example: 1, description: 'Id канала' })
  readonly channelId: number;
}
