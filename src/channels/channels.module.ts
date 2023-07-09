import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Channels } from './channels.model';

@Module({
  providers: [ChannelsService],
  controllers: [ChannelsController],
  imports: [SequelizeModule.forFeature([Channels])],
})
export class ChannelsModule {}
