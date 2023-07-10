import { Body, Controller, Post } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannel } from './dto/create-channels.dto';
import { SendMessage } from './dto/send-message.dto';
import { DeleteMessages } from './dto/delete-messages.dto';

@Controller('channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}
  @Post()
  create(@Body() channelDto: CreateChannel) {
    return this.channelsService.createChannel(channelDto);
  }

  @Post('sendmessage')
  sendMessage(@Body() messageDto: SendMessage) {
    return this.channelsService.sendMessage(messageDto);
  }
  @Post('deletemessages')
  deleteMessage(@Body() messageDto: DeleteMessages) {
    return this.channelsService.deleteMessage(messageDto);
  }

  // FIXME Add new user to channel

  // TODO Delete user from channel

  // TODO Change message
}
