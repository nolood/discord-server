import { Injectable } from '@nestjs/common';
import { CreateChannel } from './dto/create-channels.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Channel } from './channels.model';
import { SendMessage } from './dto/send-message.dto';
import { uuid } from 'uuidv4';
import { DeleteMessages } from './dto/delete-messages.dto';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel(Channel) private channelRepository: typeof Channel,
  ) {}
  async createChannel(dto: CreateChannel) {
    const { users } = dto;
    const channel = this.channelRepository.create({ users });
    return channel;
  }

  async sendMessage(dto: SendMessage) {
    const { message, user, channelId } = dto;
    const newMessage = {
      id: uuid(),
      message,
      user,
      date: String(Date.now()),
    };
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });
    const updatedMessages = [...channel.messages, newMessage];
    await channel.update({ messages: updatedMessages });
    return channel;
  }

  async deleteMessage(dto: DeleteMessages) {
    const { channelId, messageIds } = dto;
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });
    const messages = channel.messages;
    const updatedMessages = messages.filter((message) => {
      if (!messageIds.find((id) => id === message?.id)) {
        return { ...message };
      }
    });
    channel.update({ messages: updatedMessages });
    return channel;
  }
}
