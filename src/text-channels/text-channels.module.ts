import { Module } from '@nestjs/common';
import { TextChannelsService } from './text-channels.service';
import { TextChannelsController } from './text-channels.controller';

@Module({
  providers: [TextChannelsService],
  controllers: [TextChannelsController],
})
export class TextChannelsModule {}
