import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NewPoll } from 'src/model/NewPoll';
export declare class TgBotService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private readonly logger;
    private readonly bot;
    private readonly botConfig;
    constructor(configService: ConfigService);
    postPoll(poll: NewPoll): Promise<void>;
    onModuleInit(): void;
    onModuleDestroy(): void;
}
