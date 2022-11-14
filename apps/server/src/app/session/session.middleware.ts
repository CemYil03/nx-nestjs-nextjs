import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { environment } from '../../environments/environment.local';
import { IdentifierService } from '../_shared-services/identifier/identifier.service';
import { SessionService } from './service/session.service';
import { Session } from './session.model';

@Injectable()
export class SessionMiddleWare implements NestMiddleware {
    private readonly sessionTimeToLive: number = 30 * 24 * 60 * 60 * 1000;

    constructor(private readonly sessionService: SessionService, private readonly identifierService: IdentifierService) {}

    async use(request: Request, response: Response, next: NextFunction): Promise<void> {
        const sessionId: string | undefined = request.cookies[environment.type];

        if (!sessionId) {
            const success: boolean = await this.createNewSession(request, response);
            if (!success) throw new Error('session creation failed');
            next();
            return;
        }

        const session: Session | null = await this.sessionService.findOne(sessionId);
        if (!session || (session !== null && new Date(session.lastUpdatedAt).getTime() < new Date().getTime() + this.sessionTimeToLive)) {
            const success: boolean = await this.createNewSession(request, response);
            if (!success) throw new Error('session creation failed');
            next();
            return;
        }

        await this.sessionService.updateLastUpdatedAt(session.sessionId);

        request['session'] = session;

        next();
    }

    private async createNewSession(request: Request, response: Response): Promise<boolean> {
        const generatedSessionId: string = this.identifierService.generateNanoId();
        const success: boolean = await this.sessionService.createOne(generatedSessionId);
        if (!success) return false;

        response.cookie(environment.type, generatedSessionId, {
            httpOnly: true,
            expires: new Date(Date.now() + this.sessionTimeToLive),
            secure: environment.type !== 'local',
            sameSite: 'strict',
        });

        request['session'] = { sessionId: generatedSessionId, userId: null };
        return true;
    }
}
