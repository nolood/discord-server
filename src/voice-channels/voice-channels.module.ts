import { Module } from '@nestjs/common';
import { VoiceChannelsService } from './voice-channels.service';
import { VoiceChannelsController } from './voice-channels.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { VoiceChannel } from './voice-channels.model';

@Module({
  providers: [VoiceChannelsService],
  controllers: [VoiceChannelsController],
  imports: [SequelizeModule.forFeature([VoiceChannel])],
})
export class VoiceChannelsModule {}
