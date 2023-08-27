import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AcceptOrDismissFriendRequest } from './dto/accept-or-dismiss-friend-request.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteFriendRequest } from './dto/delete-friend-req.dto';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { SendFriendRequest } from './dto/send-friend-request.dto';
import { SetStatus } from './dto/set-status.dto';
import { AcceptOrDismissFriendResponse } from './responses/AcceptOrDismissFriendResponse';
import { DeleteFriendResponse } from './responses/DeleteFriendResponse';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Действия с пользователями')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll(@Query('nickname') nickname: string) {
    return this.usersService.getAllUsers(nickname);
  }

  @ApiOperation({ summary: 'Отправить заявку в друзья' })
  @ApiResponse({
    status: 200,
    type: User,
    description: 'Вернётся получатель запроса в друзья',
  })
  @Post('sendfriendreq')
  sendFriendRequest(@Body() userDto: SendFriendRequest) {
    return this.usersService.sendFriendRequest(userDto);
  }

  @ApiOperation({ summary: 'Принять заявку в друзья' })
  @ApiResponse({ status: 200, type: AcceptOrDismissFriendResponse })
  @Post('acceptfriendreq')
  acceptFriend(@Body() userDto: AcceptOrDismissFriendRequest) {
    return this.usersService.acceptFriendRequest(userDto);
  }

  @ApiOperation({ summary: 'Отклонить заявку в друзья' })
  @ApiResponse({ status: 200, type: AcceptOrDismissFriendResponse })
  @Post('dismissfriendreq')
  dismissFriendRequest(@Body() userDto: AcceptOrDismissFriendRequest) {
    return this.usersService.dismissFriendRequest(userDto);
  }

  @ApiOperation({ summary: 'Удалить из друзей' })
  @ApiResponse({ status: 200, type: DeleteFriendResponse })
  @Post('deletefriendreq')
  deleteFriendRequest(@Body() userDto: DeleteFriendRequest) {
    return this.usersService.deleteFriendRequest(userDto);
  }

  @ApiOperation({ summary: 'Установить статус' })
  @ApiResponse({ status: 200, type: User })
  @Post('status')
  setStatus(@Body() userDto: SetStatus) {
    return this.usersService.setStatus(userDto);
  }

  @ApiOperation({ summary: 'Зарегистрироваться' })
  @ApiResponse({ status: 200, type: RegistrationDto })
  @Post('registration')
  async registration(
    @Body() userDto: RegistrationDto,
    @Res({ passthrough: true }) response,
  ) {
    const res = await this.usersService.registration(userDto);
    if (res.type !== 'error') {
      response.cookie('accessToken', res.message, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res;
    }
    return res;
  }

  @ApiOperation({ summary: 'Войти' })
  @ApiResponse({ status: 200, type: LoginDto })
  @Post('login')
  async login(@Body() userDto: LoginDto, @Res({ passthrough: true }) response) {
    const res = await this.usersService.login(userDto);
    if (res.type !== 'error') {
      response.cookie('accessToken', res.message, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res;
    }
    return res;
  }

  @ApiOperation({ summary: 'Выйти' })
  @ApiResponse({ status: 200, type: LoginDto })
  @Post('logout')
  async logout(@Req() request) {
    request.cookie.clear();
  }
}
