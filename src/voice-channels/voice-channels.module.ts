import { Module } from '@nestjs/common';
import { VoiceChannelsService } from './voice-channels.service';
import { VoiceChannelsController } from './voice-channels.controller';

@Module({
  providers: [VoiceChannelsService],
  controllers: [VoiceChannelsController],
})
export class VoiceChannelsModule {}
