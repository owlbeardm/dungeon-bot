import { TgBotService } from './tg-bot.service';
export declare class PollService {
    private tgBot;
    constructor(tgBot: TgBotService);
    postWhenToPlayPoll(): Promise<void>;
    private createWhenToPlayPollForToday;
}
