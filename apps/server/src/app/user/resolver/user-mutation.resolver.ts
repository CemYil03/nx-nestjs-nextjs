import { Field, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';

@ObjectType()
export class UserMutation {
    @Field(() => Boolean)
    readonly createOne!: boolean;

    @Field(() => Boolean)
    readonly deleteOne!: boolean;
}

@Resolver(() => UserMutation)
export class UserMutationResolver {
    @ResolveField()
    createOne(): boolean {
        return false;
    }

    @ResolveField()
    deleteOne(): boolean {
        return false;
    }
}
