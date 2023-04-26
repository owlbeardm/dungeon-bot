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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const poll_service_1 = require("./poll.service");
let TaskService = class TaskService {
    constructor(pollService) {
        this.pollService = pollService;
        this.logger = new common_1.Logger('TasksService');
    }
    postWhenToPlayPoll() {
        this.logger.debug('Post new when to play poll');
        this.pollService.postWhenToPlayPoll();
    }
};
__decorate([
    (0, schedule_1.Cron)('0 0 13 * * 6'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskService.prototype, "postWhenToPlayPoll", null);
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [poll_service_1.PollService])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map