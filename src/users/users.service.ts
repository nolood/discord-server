import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { SendFriendRequest } from './dto/send-friend-request.dto';
import { AcceptOrDismissFriendRequest } from './dto/accept-or-dismiss-friend-request.dto';
import { GetUsersByNickname } from './dto/get-users-by-nickname.dto';
import { Op } from 'sequelize';
import { DeleteFriendRequest } from './dto/delete-friend-req.dto';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { SetStatus } from './dto/set-status.dto';

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

  async setStatus(dto: SetStatus) {
    const { userId, status } = dto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.update({ status });
    return { user };
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '24h',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  async registration(dto: RegistrationDto) {
    const { email, password, nickname } = dto;
    const candidateEmail = await this.userRepository.findOne({
      where: { email },
    });
    const candidateNickname = await this.userRepository.findOne({
      where: { nickname },
    });

    if (candidateNickname) {
      return {
        message: `Пользователь с ником ${nickname} уже существует`,
        type: 'error',
      };
    }

    if (candidateEmail) {
      return {
        message: `Пользователь с email ${email} уже существует`,
        type: 'error',
      };
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await this.userRepository.create({
      email,
      nickname,
      password: hashPassword,
    });

    const { accessToken, refreshToken } = this.generateTokens({
      id: user.id,
      email,
      nickname,
    });

    await user.update({ refreshToken });
    return { message: accessToken, type: 'success' };
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return { message: 'Такого пользователя не существует', type: 'error' };
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      return { message: 'Указан неверный пароль', type: 'error' };
    }

    const { accessToken, refreshToken } = this.generateTokens({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    });

    await user.update({ refreshToken: refreshToken });
    return { type: 'success', message: accessToken };
  }
}
