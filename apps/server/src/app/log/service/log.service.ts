import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { environment } from '../../../environments/environment.local';
import { IdentifierService } from '../../_shared-services/identifier/identifier.service';
import { FindManyLogsRequest } from '../dtos/find-many-logs.request';
import { Log } from '../log.model';

@Injectable()
export class LogService {
    constructor(@InjectRepository(Log) private readonly logs: Repository<Log>, private readonly identifierService: IdentifierService) {}

    async findMany(request: FindManyLogsRequest): Promise<Log[]> {
        try {
            const logs: Log[] = await this.logs.find();
            return logs;
        } catch (error) {
            await this.createOne(error, LogService.name, LogService.prototype.findMany.name);
            return [];
        }
    }

    async createOne(message: string, className: string, methodName: string, color: 'none' | 'red' | 'pink' = 'none'): Promise<void> {
        const stringifiedMessage: string = JSON.stringify(message ?? '');

        if (environment.type === 'local') {
            if (color === 'none') Logger.log(stringifiedMessage, `${className}.${methodName}`);
            if (color === 'red') Logger.error(stringifiedMessage, `${className}.${methodName}`);
            if (color === 'pink') Logger.debug(stringifiedMessage, `${className}.${methodName}`);
            return;
        }

        try {
            await this.logs.insert({
                logId: this.identifierService.generateNanoId(),
                message: stringifiedMessage,
                class: className,
                method: methodName,
            });
        } catch (error) {
            Logger.error(error);
        }
    }
}
