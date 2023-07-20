import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { SendFriendRequest } from './dto/send-friend-request.dto';
import { AcceptOrDismissFriendRequest } from './dto/accept-or-dismiss-friend-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { AcceptOrDismissFriendResponse } from './responses/AcceptOrDismissFriendResponse';
import { GetUsersByNickname } from './dto/get-users-by-nickname.dto';
import { DeleteFriendRequest } from './dto/delete-friend-req.dto';
import { DeleteFriendResponse } from './responses/DeleteFriendResponse';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';

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
  getAll(@Body() searchDto: GetUsersByNickname) {
    return this.usersService.getAllUsers(searchDto);
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

  @ApiOperation({ summary: 'Зарегистрироваться' })
  @ApiResponse({ status: 200, type: RegistrationDto })
  @Post('registration')
  registration(@Body() userDto: RegistrationDto) {
    return this.usersService.registration(userDto);
  }

  @ApiOperation({ summary: 'Войти' })
  @ApiResponse({ status: 200, type: LoginDto })
  @Post('login')
  login(@Body() userDto: LoginDto) {
    return this.usersService.login(userDto);
  }
}
