import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'nolood@gmail.com',
    description: 'Уникальный email пользователя',
  })
  readonly email: string;
  @ApiProperty({
    example: '123456',
    description: 'Пароль пользователя',
  })
  readonly password: string;
  @ApiProperty({
    example: 'nolood',
    description: 'Уникальный nickname пользователя',
  })
  readonly nickname: string;
}
