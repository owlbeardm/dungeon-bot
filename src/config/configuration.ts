export default () => ({
  bot: {
    token: process.env.BOT_TOKEN,
    gameChatId: process.env.GAME_CHAT_ID,
    gameChatPollThreadId: process.env.GAME_CHAT_POLL_THREAD_ID
      ? parseInt(process.env.GAME_CHAT_POLL_THREAD_ID)
      : undefined,
    listenToAllMessages: !!process.env.LISTEN_TO_ALL_MESSAGES,
  },
});
