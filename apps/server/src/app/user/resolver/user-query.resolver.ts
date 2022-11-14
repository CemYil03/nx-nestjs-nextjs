import { Args, Field, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../user.model';

@ObjectType()
export class UserQuery {
    @Field(() => User, { nullable: true })
    readonly findOne?: User | null;

    @Field(() => [User])
    readonly findMany?: User[];
}

@Resolver(() => UserQuery)
export class UserQueryResolver {
    @ResolveField()
    findOne(@Args('userId', { nullable: false }) userId: string): User | null {
        console.log(userId);
        return null;
    }

    @ResolveField(() => [User])
    findMany(): User[] {
        return [];
    }
}
