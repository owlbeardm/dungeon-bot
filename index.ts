import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { NewPoll } from './src/model/NewPoll';
import { CalendarDate, addDays, dayOfWeek, monthName, serializeIso8601String, calendarDateFromJsDateObject } from 'typescript-calendar-date';
import { WeekDay } from 'typescript-calendar-date/dist/consts';
import * as schedule from "node-schedule";
import { NestFactory } from "@nestjs/core";
import { AppModule } from './src/app.module';
import { AppService } from 'src/app.service';

// const stringifiedDays = {
//   mon: 'понедельник',
//   tue: 'вторник',
//   wed: 'среду',
//   thu: 'четверг',
//   fri: 'пятницу',
//   sat: 'субботу',
//   sun: 'воскресенье',
// }

// const createDayPoll = () => {
//   const today = calendarDateFromJsDateObject(new Date());
//   let firstMonday = today;
//   while (dayOfWeek(firstMonday) !== 'mon') {
//     firstMonday = addDays(firstMonday, 1);
//   }
//   const opt: string[] = [];
//   while (opt.length < 7) {
//     const currentOptionDay = addDays(firstMonday, opt.length);
//     const isoDate = serializeIso8601String(currentOptionDay);
//     opt.push(`${stringifiedDays[dayOfWeek(currentOptionDay)]} (${isoDate.slice(8, 10)}.${isoDate.slice(5, 7)})`);
//   }
//   const newPoll: NewPoll = {
//     question: 'Я бы сыграл в:',
//     options: opt
//   }
//   return newPoll;
// }


// const bot = new Telegraf(botToken);
// bot.launch();


// const poll = createDayPoll();

// // Enable graceful stop
// process.once('SIGINT', () => {
//   bot.stop('SIGINT')
//   schedule.gracefulShutdown()
//     .then(() => process.exit(0))
// });
// process.once('SIGTERM', () => {
//   bot.stop('SIGTERM')
//   schedule.gracefulShutdown()
//     .then(() => process.exit(0))
// });

// const startScheduler = () => {
//   var rule = new schedule.RecurrenceRule();
//   // rule.dayOfWeek = 6;
//   // rule.hour = 13;
//   rule.minute = new schedule.Range(0, 50);
//   schedule.scheduleJob(rule, async function () {
//     await bot.telegram.sendPoll(gameChatId, poll.question, poll.options, { message_thread_id: gameChatPollThreadId, disable_notification: false, is_anonymous: false, allows_multiple_answers: true }).then(data => {
//       bot.telegram.unpinAllChatMessages(gameChatId);
//       bot.telegram.pinChatMessage(gameChatId, data.message_id, { disable_notification: true });
//     });
//   })
// }

// startScheduler();


// bot.on(message("text"), ctx => { console.log(ctx.message.chat, ctx.message.message_thread_id) });

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get(AppService);
  appService.getHello();
  await app.close();
}
bootstrap();