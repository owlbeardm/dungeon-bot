import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PollService } from './poll.service';

//        * * * * * *
//        | | | | | |
//        | | | | | day of week
//        | | | | months
//        | | | day of month
//        | | hours
//        | minutes
//        seconds (optional)

@Injectable()
export class TaskService {
  private readonly logger = new Logger('TasksService');

  constructor(private pollService: PollService) {}

  @Cron('0 0 13 * * 6')
  postWhenToPlayPoll() {
    this.logger.debug('Post new when to play poll');
    this.pollService.postWhenToPlayPoll();
  }
}
