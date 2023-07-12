import { Body, Controller, Post, Get, Delete } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannel } from './dto/create-channels.dto';
import { SendMessage } from './dto/send-message.dto';
import { DeleteMessages } from './dto/delete-messages.dto';
import { AddOrDeleteUserToChannel } from './dto/add-or-del-user-to-channel.dto';
import { ChangeMessage } from './dto/change-message.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Channel } from './channels.model';

@Controller('channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}
  @ApiOperation({ summary: 'Создание канала' })
  @ApiResponse({ status: 200, type: Channel })
  @Post()
  create(@Body() channelDto: CreateChannel) {
    return this.channelsService.createChannel(channelDto);
  }

  @ApiOperation({ summary: 'Отправка сообщения' })
  @ApiResponse({ status: 200, type: Channel })
  @Post('sendmessage')
  sendMessage(@Body() messageDto: SendMessage) {
    return this.channelsService.sendMessage(messageDto);
  }

  @ApiOperation({ summary: 'Удаление сообщений' })
  @ApiResponse({ status: 200, type: Channel })
  @Post('deletemessages')
  deleteMessage(@Body() messageDto: DeleteMessages) {
    return this.channelsService.deleteMessage(messageDto);
  }

  @ApiOperation({ summary: 'Добавление пользователя' })
  @ApiResponse({ status: 200, type: Channel })
  @Post('adduser')
  addUserToChannel(@Body() addUserDto: AddOrDeleteUserToChannel) {
    return this.channelsService.addUserToChannel(addUserDto);
  }

  @ApiOperation({ summary: 'Получение всех каналов' })
  @ApiResponse({ status: 200, type: Channel })
  @Get()
  getAllChannel() {
    return this.channelsService.getAllChannels();
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, type: Channel })
  @Delete('deleteuser')
  deleteUserFromChannel(@Body() deleteUserDto: AddOrDeleteUserToChannel) {
    return this.channelsService.deleteUserFromChannel(deleteUserDto);
  }

  @ApiOperation({ summary: 'Изменение сообщения' })
  @ApiResponse({ status: 200, type: Channel })
  @Post('changemessage')
  changeMessage(@Body() changeMessageDto: ChangeMessage) {
    return this.channelsService.changeMessage(changeMessageDto);
  }
}
