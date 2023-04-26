"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollService = void 0;
const common_1 = require("@nestjs/common");
const stringifiedDays_1 = require("../util/stringifiedDays");
const typescript_calendar_date_1 = require("typescript-calendar-date");
const tg_bot_service_1 = require("./tg-bot.service");
let PollService = class PollService {
    constructor(tgBot) {
        this.tgBot = tgBot;
    }
    async postWhenToPlayPoll() {
        const newPoll = this.createWhenToPlayPollForToday();
        await this.tgBot.postPoll(newPoll);
    }
    createWhenToPlayPollForToday() {
        const today = (0, typescript_calendar_date_1.calendarDateFromJsDateObject)(new Date());
        let firstMonday = today;
        while ((0, typescript_calendar_date_1.dayOfWeek)(firstMonday) !== 'mon') {
            firstMonday = (0, typescript_calendar_date_1.addDays)(firstMonday, 1);
        }
        const opt = [];
        while (opt.length < 7) {
            const currentOptionDay = (0, typescript_calendar_date_1.addDays)(firstMonday, opt.length);
            const isoDate = (0, typescript_calendar_date_1.serializeIso8601String)(currentOptionDay);
            opt.push(`${stringifiedDays_1.stringifiedDays[(0, typescript_calendar_date_1.dayOfWeek)(currentOptionDay)]} (${isoDate.slice(8, 10)}.${isoDate.slice(5, 7)})`);
        }
        const newPoll = {
            question: 'Я бы сыграл в:',
            options: opt,
        };
        return newPoll;
    }
};
PollService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tg_bot_service_1.TgBotService])
], PollService);
exports.PollService = PollService;
//# sourceMappingURL=poll.service.js.map