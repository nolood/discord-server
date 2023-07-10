import { ApiProperty } from '@nestjs/swagger';

export class GetUsersByNickname {
  @ApiProperty({
    example: 'nolo',
    description: 'По этому полю осуществляется поиск',
  })
  readonly value: string | undefined;
}
