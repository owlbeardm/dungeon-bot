import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { NewPoll } from './src/model/NewPoll';
import { CalendarDate, addDays, dayOfWeek, monthName, serializeIso8601String } from 'typescript-calendar-date';
import { WeekDay } from 'typescript-calendar-date/dist/consts';
import * as schedule from "node-schedule";

const convertDayOfTheWeekToString = (dayOfWeek: WeekDay) => {
  switch (dayOfWeek) {
    case 'mon': return 'Понедельник';
    case 'tue': return 'Вторник';
    case 'wed': return 'Среда';
    case 'thu': return 'Четверг';
    case 'fri': return 'Пятница';
    case 'sat': return 'Суббота';
    case 'sun': return 'Воскресенье';
    default: return '';
  }
}

const createDayPoll = () => {
  const today: CalendarDate = {
    year: new Date().getFullYear(),
    month: monthName(new Date().getMonth() + 1),
    day: new Date().getDate(),
  };
  let firstMonday = today;
  while (dayOfWeek(firstMonday) !== 'mon') {
    firstMonday = addDays(firstMonday, 1);
  }
  const opt: string[] = [];
  while (opt.length < 7) {
    const currentOptionDay = addDays(firstMonday, opt.length);
    const isoDate = serializeIso8601String(currentOptionDay);
    opt.push(`${convertDayOfTheWeekToString(dayOfWeek(currentOptionDay))} (${isoDate.slice(5, 7)}.${isoDate.slice(8, 10)})`);
  }
  const newPoll: NewPoll = {
    question: 'Я бы сыграл в',
    options: opt
  }
  return newPoll;
}


const bot = new Telegraf(process.env.BOT_TOKEN ? process.env.BOT_TOKEN : '');
const gameChatId = process.env.GAME_CHAT_ID ? process.env.GAME_CHAT_ID : '';
const gameChatPollThreadId = process.env.GAME_CHAT_POLL_THREAD_ID ? parseInt(process.env.GAME_CHAT_POLL_THREAD_ID) : undefined;

// // bot.on(message("text"), ctx => {
//   // ctx.sendPoll("Когда играем?", ["сегодня", "завтра", "послезавтра"], { is_anonymous: false, allows_multiple_answers: true })
// // });

bot.launch();
const poll = createDayPoll();



// Enable graceful stop
process.once('SIGINT', () => {
  bot.stop('SIGINT')
  schedule.gracefulShutdown()
    .then(() => process.exit(0))
});
process.once('SIGTERM', () => {
  bot.stop('SIGTERM')
  schedule.gracefulShutdown()
    .then(() => process.exit(0))
});

const startScheduler = () => {
  var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = 6;
  rule.hour = 13;
  rule.minute = 0;
  schedule.scheduleJob(rule, async function () {
    await bot.telegram.sendPoll(gameChatId, poll.question, poll.options, { message_thread_id: gameChatPollThreadId, disable_notification: false, is_anonymous: false, allows_multiple_answers: true }).then(data => {
      bot.telegram.unpinAllChatMessages(gameChatId);
      bot.telegram.pinChatMessage(gameChatId, data.message_id, { disable_notification: true });
    });
  })
}

startScheduler();


// bot.on(message("text"), ctx => { console.log(ctx.message.chat, ctx.message.message_thread_id) });