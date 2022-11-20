import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from './repository.module';
import { ResolverModule } from './resolver.module';
import { ServiceModule } from './service.module';
import { SessionMiddleware } from '../session/session.middleware';

@Module({
    imports: [RepositoryModule, ServiceModule, ResolverModule, ConfigModule.forRoot({ isGlobal: true })],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(SessionMiddleware).forRoutes('*');
    }
}
