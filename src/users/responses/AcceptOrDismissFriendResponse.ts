import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users.model';

export class AcceptOrDismissFriendResponse {
  @ApiProperty({ type: User })
  sender: User;
  @ApiProperty({ type: User })
  recipient: User;
}
