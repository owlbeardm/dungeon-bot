import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class AppModule implements OnModuleInit {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService);
    onModuleInit(): void;
}
