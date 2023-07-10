import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { SendFriendRequest } from './dto/send-friend-request.dto';
import { AcceptOrDismissFriendRequest } from './dto/accept-or-dismiss-friend-request.dto';
import { GetUsersByNickname } from './dto/get-users-by-nickname.dto';
import { Op } from 'sequelize';
import { DeleteFriendRequest } from './dto/delete-friend-req.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers(dto: GetUsersByNickname) {
    const { value } = dto;
    let users;
    if (!value) {
      users = await this.userRepository.findAll();
    } else {
      users = await this.userRepository.findAll({
        where: {
          nickname: {
            [Op.like]: `%${value}%`,
          },
        },
      });
    }
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

  async acceptFriendRequest(dto: AcceptOrDismissFriendRequest) {
    const { senderId, recipientId } = dto;
    const recipient = await this.userRepository.findOne({
      where: { id: recipientId },
    });
    const sender = await this.userRepository.findOne({
      where: { id: senderId },
    });
    const updatedRequests = recipient.requests.filter(
      (item) => item.senderId !== senderId,
    );
    const updatedRecipientFriends = [...recipient.friends, senderId];
    const updatedSenderFriends = [...sender.friends, recipientId];

    recipient.update({ requests: updatedRequests });
    recipient.update({ friends: updatedRecipientFriends });
    sender.update({ friends: updatedSenderFriends });

    return { recipient, sender };
  }

  async dismissFriendRequest(dto: AcceptOrDismissFriendRequest) {
    const { senderId, recipientId } = dto;
    const recipient = await this.userRepository.findOne({
      where: { id: recipientId },
    });

    const updatedRequests = recipient.requests.filter(
      (item) => item.senderId !== senderId,
    );

    recipient.update({ requests: updatedRequests });

    return recipient;
  }

  async deleteFriendRequest(dto: DeleteFriendRequest) {
    const { friendId, userId } = dto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const friend = await this.userRepository.findOne({
      where: { id: friendId },
    });
    const updatedFriendFriends = friend.friends.filter(
      (item) => item !== userId,
    );
    const updatedUserFriends = user.friends.filter((item) => item !== friendId);
    user.update({ friends: updatedUserFriends });
    friend.update({ friends: updatedFriendFriends });
    return { friend, user };
  }
}
