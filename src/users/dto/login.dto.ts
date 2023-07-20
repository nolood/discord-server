import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
}
