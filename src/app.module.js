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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const package_json_1 = __importDefault(require("../package.json"));
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = __importDefault(require("./config/configuration"));
const tg_bot_service_1 = require("./service/tg-bot.service");
const schedule_1 = require("@nestjs/schedule");
const task_service_1 = require("./service/task.service");
const poll_service_1 = require("./service/poll.service");
let AppModule = class AppModule {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger('AppModule');
    }
    onModuleInit() {
        this.logger.log(`AppModule started v${package_json_1.default.version}.`);
        this.logger.log(`Configuration:`);
        this.logger.log(`\t gameChatId : ${this.configService.get('bot.gameChatId')}`);
        this.logger.log(`\t gameChatPollThreadId : ${this.configService.get('bot.gameChatPollThreadId')}`);
        this.logger.log(`\t listenToAllMessages : ${this.configService.get('bot.listenToAllMessages')}`);
    }
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
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map