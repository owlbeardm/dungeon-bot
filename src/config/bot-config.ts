export interface BotConfig {
  token: string;
  gameChatId: string;
  gameChatPollThreadId?: number;
  listenToAllMessages?: boolean;
}
