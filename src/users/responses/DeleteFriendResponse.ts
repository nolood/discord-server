import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users.model';

export class DeleteFriendResponse {
  @ApiProperty({ type: User })
  friend: User;
  @ApiProperty({ type: User })
  user: User;
}
