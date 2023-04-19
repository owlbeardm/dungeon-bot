import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const bot = new Telegraf(process.env.BOT_TOKEN ? process.env.BOT_TOKEN : '');

// bot.on(message("text"), ctx => {
  // ctx.sendPoll("Когда играем?", ["сегодня", "завтра", "послезавтра"], { is_anonymous: false, allows_multiple_answers: true })
// });

bot.launch();

bot.telegram.sendPoll(-1001666530248,`Когда играем? ${Date()}`, ["сегодня", "завтра", "послезавтра"], { is_anonymous: false, allows_multiple_answers: true }).then(data=>{
  // data.message_id
  bot.telegram.unpinAllChatMessages(-1001666530248);
  bot.telegram.pinChatMessage(-1001666530248,data.message_id,{disable_notification:false});
  
})

console.log(bot.context)

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));