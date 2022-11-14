import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { environment } from '../../environments/environment.local';
import { Log } from '../log/log.model';
import { Session } from '../session/session.model';
import { User } from '../user/user.model';

const entities: EntityClassOrSchema[] = [Log, Session, User];

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                database: configService.get<string>('DATABASE_NAME'),
                username: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                entities: entities,
                retryAttempts: 1,
                synchronize: true,
                dropSchema: environment.type === 'local',
                keepConnectionAlive: true,
            }),
        }),
        TypeOrmModule.forFeature(entities),
    ],
    exports: [TypeOrmModule.forFeature(entities)],
})
export class RepositoryModule {}
