import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ServersModule } from './servers/servers.module';
import { TextChannelsModule } from './text-channels/text-channels.module';
import { VoiceChannelsModule } from './voice-channels/voice-channels.module';
import { ChannelsModule } from './channels/channels.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true,
    }),
    UsersModule,
    ServersModule,
    TextChannelsModule,
    VoiceChannelsModule,
    ChannelsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
