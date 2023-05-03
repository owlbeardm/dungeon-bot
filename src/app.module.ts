import packageJson from '../package.json';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TgBotService } from './service/tg-bot.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './service/task.service';
import { PollService } from './service/poll.service';

@Module({
  providers: [TgBotService, TaskService, PollService],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger('AppModule');

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.logger.log(`AppModule started v${packageJson.version}.`);
    this.logger.log(`Configuration:`);
    this.logger.log(
      `\t gameChatId : ${this.configService.get('bot.gameChatId')}`,
    );
    this.logger.log(
      `\t gameChatPollThreadId : ${this.configService.get(
        'bot.gameChatPollThreadId',
      )}`,
    );
    this.logger.log(
      `\t listenToAllMessages : ${this.configService.get(
        'bot.listenToAllMessages',
      )}`,
    );
  }
}
