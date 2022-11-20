import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { LogService } from '../../log/service/log.service';
import { FindManySessionsRequest } from '../dtos/find-many-sessions.request';
import { Session } from '../session.model';

@Injectable()
export class SessionService {
    constructor(@InjectRepository(Session) private readonly sessions: Repository<Session>, private readonly logService: LogService) {}

    async findMany(request: FindManySessionsRequest): Promise<Session[]> {
        try {
            const sessions: Session[] = await this.sessions.find();
            return sessions;
        } catch (error) {
            await this.logService.createOne(error, SessionService.name, SessionService.prototype.findMany.name);
            return [];
        }
    }

    async findOne(sessionId: string): Promise<Session | null> {
        try {
            const session: Session | null = await this.sessions.findOne({ where: { sessionId: sessionId } });
            return session;
        } catch (error) {
            await this.logService.createOne(error, SessionService.name, SessionService.prototype.findOne.name);
            return null;
        }
    }

    async createOne(sessionId: string): Promise<boolean> {
        try {
            await this.sessions.insert({
                sessionId: sessionId,
            });
            return true;
        } catch (error) {
            await this.logService.createOne(error, SessionService.name, SessionService.prototype.createOne.name);
            return false;
        }
    }

    async updateLastUpdatedAt(sessionId: string): Promise<boolean> {
        try {
            const result: UpdateResult = await this.sessions.update({ sessionId: sessionId }, { lastUpdatedAt: new Date() });
            return result.affected === 1;
        } catch (error) {
            await this.logService.createOne(error, SessionService.name, SessionService.prototype.createOne.name);
            return false;
        }
    }
}
