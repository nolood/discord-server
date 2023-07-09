import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { SendFriendRequest } from './dto/send-friend-request.dto';
import { AcceptFriendRequest } from './dto/accept-friend-request.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }
  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
  async sendFriendRequest(dto: SendFriendRequest) {
    const { senderId, senderNick, recipientId } = dto;
    const user = await this.userRepository.findOne({
      where: { id: recipientId },
    });
    const updatedRequests = [...user.requests, { senderId, senderNick }];
    await user.update({ requests: updatedRequests });
    return user;
  }
  async acceptFriendRequest(dto: AcceptFriendRequest) {
    const { senderId, recipientId } = dto;
    const recipient = await User.findOne({ where: { id: recipientId } });
    const sender = await User.findOne({ where: { id: senderId } });
    const updatedRequests = recipient.requests.filter(
      (item) => item.senderId !== senderId,
    );
    recipient.update({ requests: updatedRequests });
    const updatedRecipientFriends = [...recipient.friends, senderId];
    const updatedSenderFriends = [...sender.friends, recipientId];

    sender.update({ friends: updatedSenderFriends });
    recipient.update({ friends: updatedRecipientFriends });
    return { recipient, sender };
  }
}
