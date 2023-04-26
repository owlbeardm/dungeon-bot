"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const tg_bot_service_1 = require("./service/tg-bot.service");
const schedule_1 = require("@nestjs/schedule");
const task_service_1 = require("./service/task.service");
const poll_service_1 = require("./service/poll.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        providers: [tg_bot_service_1.TgBotService, task_service_1.TaskService, poll_service_1.PollService],
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
            }),
            schedule_1.ScheduleModule.forRoot(),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map