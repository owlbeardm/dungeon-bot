import { PollService } from './poll.service';
export declare class TaskService {
    private pollService;
    private readonly logger;
    constructor(pollService: PollService);
    postWhenToPlayPoll(): void;
}
