import { ApiProperty } from '@nestjs/swagger';

export class SendFriendRequest {
  @ApiProperty({ example: 1, description: 'Id отправителя' })
  readonly senderId: number;
  @ApiProperty({ example: 'nolood', description: 'Nickname отправителя' })
  readonly senderNick: string;
  @ApiProperty({ example: 2, description: 'Id получателя' })
  readonly recipientId: number;
}
