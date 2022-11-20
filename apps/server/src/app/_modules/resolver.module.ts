import { Module, Provider } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginInlineTrace,
} from 'apollo-server-core';
import { join } from 'path';
import { GraphQLError } from 'graphql';
import { environment } from '../../environments/environment.local';
import { ServiceModule } from './service.module';
import { SessionResolver } from '../session/resolver/session.resolver';
import { UserResolver } from '../user/resolver/user.resolver';
import { UserQueryResolver } from '../user/resolver/user-query.resolver';
import { UserMutationResolver } from '../user/resolver/user-mutation.resolver';

const resolvers: Provider[] = [UserResolver, UserQueryResolver, UserMutationResolver, SessionResolver];

@Module({
    imports: [
        ServiceModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'schema.graphql'),
            sortSchema: true,
            debug: false,
            playground: false,
            plugins:
                environment.type !== 'local'
                    ? [ApolloServerPluginLandingPageProductionDefault()]
                    : [
                          ApolloServerPluginLandingPageLocalDefault({
                              embed: true,
                              variables: {},
                              document: '',
                              includeCookies: true,
                              persistExplorerState: true,
                          }),
                          ApolloServerPluginInlineTrace(),
                      ],
            // subscriptions: {
            //     'graphql-ws': true,
            // },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            context: (context: any): any => (context.extra ? { req: context?.extra.request } : context),
            cors: { credentials: true },
            formatError: (error: GraphQLError): GraphQLError => {
                delete error?.extensions?.exception;
                return error;
            },
        }),
    ],
    providers: resolvers,
    exports: resolvers,
})
export class ResolverModule {}
