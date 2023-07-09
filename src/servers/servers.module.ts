import { Module } from '@nestjs/common';
import { ServersController } from './servers.controller';
import { ServersService } from './servers.service';
import { Server } from './servers.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [ServersController],
  providers: [ServersService],
  imports: [SequelizeModule.forFeature([Server])],
})
export class ServersModule {}
