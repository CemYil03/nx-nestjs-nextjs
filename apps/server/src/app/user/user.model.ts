import { Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';
import { GraphQLNonEmptyString } from 'graphql-scalars';

@ObjectType()
export class User {
    @Field(() => GraphQLNonEmptyString)
    @Column('array')
    readonly userId!: string;
}
