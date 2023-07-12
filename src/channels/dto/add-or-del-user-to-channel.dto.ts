import { ApiProperty } from '@nestjs/swagger';

export class AddOrDeleteUserToChannel {
  @ApiProperty({ example: 1, description: 'Id канала' })
  readonly channelId: number;
  @ApiProperty({ example: 1, description: 'Id пользователя' })
  readonly userId: number;
}
