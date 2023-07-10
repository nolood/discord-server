import { ApiProperty } from '@nestjs/swagger';

export class AcceptOrDismissFriendRequest {
  @ApiProperty({ example: 1, description: 'Id отправителя' })
  readonly senderId: number;
  @ApiProperty({ example: 2, description: 'Id получателя' })
  readonly recipientId: number;
}
