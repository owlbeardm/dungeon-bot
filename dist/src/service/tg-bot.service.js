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
exports.TgBotService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const telegraf_1 = require("telegraf");
const filters_1 = require("telegraf/filters");
let TgBotService = class TgBotService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger('TgBotService');
        this.botConfig = this.configService.getOrThrow('bot');
        this.bot = new telegraf_1.Telegraf(this.botConfig.token);
    }
    async postPoll(poll) {
        await this.bot.telegram
            .sendPoll(this.botConfig.gameChatId, poll.question, poll.options, {
            message_thread_id: this.botConfig.gameChatPollThreadId,
            disable_notification: false,
            is_anonymous: false,
            allows_multiple_answers: true,
        })
            .then((data) => {
            this.bot.telegram.unpinAllChatMessages(this.botConfig.gameChatId);
            this.bot.telegram.pinChatMessage(this.botConfig.gameChatId, data.message_id, { disable_notification: true });
        });
    }
    onModuleInit() {
        this.bot.launch();
        if (this.botConfig.listenToAllMessages) {
            this.bot.on((0, filters_1.message)('text'), (ctx) => {
                var _a, _b;
                this.logger.debug(`listenToAllMessages chat ${JSON.stringify((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.chat)} \n\t thead: ${(_b = ctx.message) === null || _b === void 0 ? void 0 : _b.message_thread_id}`);
            });
        }
        this.logger.debug(`The TgBotService has been initialized.`);
    }
    onModuleDestroy() {
        try {
            this.bot.stop();
        }
        catch (ex) {
            this.logger.error(ex);
        }
        this.logger.debug(`The TgBotService has been destroyed.`);
    }
};
TgBotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TgBotService);
exports.TgBotService = TgBotService;
//# sourceMappingURL=tg-bot.service.js.map