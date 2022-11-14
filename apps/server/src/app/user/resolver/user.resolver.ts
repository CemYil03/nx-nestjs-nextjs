import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserMutation } from './user-mutation.resolver';
import { UserQuery } from './user-query.resolver';
import { User } from '../user.model';

@Resolver(() => User)
export class UserResolver {
    @Query(() => UserQuery, { name: 'User' })
    UserQuery(): UserQuery {
        return {};
    }

    @Mutation(() => UserMutation, { name: 'User' })
    UserMutation(): UserQuery {
        return {};
    }
}
