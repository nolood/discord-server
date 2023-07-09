import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { SendFriendRequest } from './dto/send-friend-request.dto';
import { AcceptFriendRequest } from './dto/accept-friend-request.dto';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Post('sendfriendreq')
  sendFriendRequest(@Body() userDto: SendFriendRequest) {
    return this.usersService.sendFriendRequest(userDto);
  }

  @Post('acceptfriendreq')
  acceptFriend(@Body() userDto: AcceptFriendRequest) {
    return this.usersService.acceptFriendRequest(userDto);
  }
}
