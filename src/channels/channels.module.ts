import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Channel } from './channels.model';

@Module({
  providers: [ChannelsService],
  controllers: [ChannelsController],
  imports: [SequelizeModule.forFeature([Channel])],
})
export class ChannelsModule {}
