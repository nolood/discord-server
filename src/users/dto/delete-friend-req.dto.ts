import { ApiProperty } from '@nestjs/swagger';

export class DeleteFriendRequest {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  readonly friendId: number;
  @ApiProperty({ example: 2, description: 'Уникальный ID' })
  readonly userId: number;
}
