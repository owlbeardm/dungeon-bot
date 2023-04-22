import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TgBotService } from './service/tg-bot.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './service/task.service';
import { PollService } from './service/poll.service';

@Module({
  providers: [AppService, TgBotService, TaskService, PollService],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
