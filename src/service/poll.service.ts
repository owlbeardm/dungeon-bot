import { Injectable } from '@nestjs/common';
import { NewPoll } from 'src/model/NewPoll';
import { stringifiedDays } from 'src/util/stringifiedDays';
import {
  addDays,
  calendarDateFromJsDateObject,
  dayOfWeek,
  serializeIso8601String,
} from 'typescript-calendar-date';
import { TgBotService } from './tg-bot.service';

@Injectable()
export class PollService {
  constructor(private tgBot: TgBotService) {}

  async postWhenToPlayPoll() {
    const newPoll = this.createWhenToPlayPollForToday();
    await this.tgBot.postPoll(newPoll);
  }

  private createWhenToPlayPollForToday() {
    const today = calendarDateFromJsDateObject(new Date());
    let firstMonday = today;
    while (dayOfWeek(firstMonday) !== 'mon') {
      firstMonday = addDays(firstMonday, 1);
    }
    const opt: string[] = [];
    while (opt.length < 7) {
      const currentOptionDay = addDays(firstMonday, opt.length);
      const isoDate = serializeIso8601String(currentOptionDay);
      opt.push(
        `${stringifiedDays[dayOfWeek(currentOptionDay)]} (${isoDate.slice(
          8,
          10,
        )}.${isoDate.slice(5, 7)})`,
      );
    }
    const newPoll: NewPoll = {
      question: 'Я бы сыграл в:',
      options: opt,
    };
    return newPoll;
  }
}
