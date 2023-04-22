import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BotConfig } from 'src/config/bot-config';
import { NewPoll } from 'src/model/NewPoll';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

@Injectable()
export class TgBotService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('TgBotService');

  private readonly bot: Telegraf;
  private readonly botConfig: BotConfig;

  constructor(private configService: ConfigService) {
    this.botConfig = this.configService.getOrThrow<BotConfig>('bot');
    this.bot = new Telegraf(this.botConfig.token);
  }

  async postPoll(poll: NewPoll) {
    await this.bot.telegram
      .sendPoll(this.botConfig.gameChatId, poll.question, poll.options, {
        message_thread_id: this.botConfig.gameChatPollThreadId,
        disable_notification: false,
        is_anonymous: false,
        allows_multiple_answers: true,
      })
      .then((data) => {
        this.bot.telegram.unpinAllChatMessages(this.botConfig.gameChatId);
        this.bot.telegram.pinChatMessage(
          this.botConfig.gameChatId,
          data.message_id,
          { disable_notification: true },
        );
      });
  }

  onModuleInit() {
    this.bot.launch();
    if (this.botConfig.listenToAllMessages) {
      this.bot.on(message('text'), (ctx) => {
        this.logger.debug(
          `listenToAllMessages chat ${JSON.stringify(
            ctx.message?.chat,
          )} \n\t thead: ${ctx.message?.message_thread_id}`,
        );
      });
    }
    this.logger.debug(`The TgBotService has been initialized.`);
  }

  onModuleDestroy() {
    try {
      this.bot.stop();
    } catch (ex) {
      this.logger.error(ex);
    }
    this.logger.debug(`The TgBotService has been destroyed.`);
  }
}
