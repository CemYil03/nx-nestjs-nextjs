import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindManyUsersRequest {
    @Field(() => String, { nullable: true })
    searchText!: string | null;
}
