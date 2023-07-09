import { Module } from '@nestjs/common';
import { TextChannelsService } from './text-channels.service';
import { TextChannelsController } from './text-channels.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextChannel } from './text-channels.model';

@Module({
  providers: [TextChannelsService],
  controllers: [TextChannelsController],
  imports: [SequelizeModule.forFeature([TextChannel])],
})
export class TextChannelsModule {}
