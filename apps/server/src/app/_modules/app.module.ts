import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository.module';
import { ResolverModule } from './resolver.module';
import { ServiceModule } from './service.module';

@Module({
    imports: [RepositoryModule, ServiceModule, ResolverModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
