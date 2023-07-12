import { Injectable } from '@nestjs/common';
import { CreateChannel } from './dto/create-channels.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Channel } from './channels.model';
import { SendMessage } from './dto/send-message.dto';
import { uuid } from 'uuidv4';
import { DeleteMessages } from './dto/delete-messages.dto';
import { AddOrDeleteUserToChannel } from './dto/add-or-del-user-to-channel.dto';
import { ChangeMessage } from './dto/change-message.dto';

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

  async addUserToChannel(dto: AddOrDeleteUserToChannel) {
    const { channelId, userId } = dto;
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });
    const updatedChannelUsers = [...channel.users, userId];
    await channel.update({ users: updatedChannelUsers });

    return channel;
  }

  async getAllChannels() {
    const channels = await this.channelRepository.findAndCountAll();

    return channels;
  }

  async deleteUserFromChannel(dto: AddOrDeleteUserToChannel) {
    const { channelId, userId } = dto;
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });
    const updatedChannelUsers = channel.users.filter((item) => item !== userId);
    await channel.update({ users: updatedChannelUsers });

    return channel;
  }

  async changeMessage(dto: ChangeMessage) {
    const { messageId, messageText, channelId } = dto;
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });
    const updatedMessages = channel.messages.map((item) =>
      item.id === messageId ? { ...item, message: messageText } : item,
    );
    await channel.update({ messages: updatedMessages });

    return channel;
  }
}
