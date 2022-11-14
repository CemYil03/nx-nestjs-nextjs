import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity('Logs')
export class Log {
    @Field(() => String)
    @PrimaryColumn('char', { length: 20 })
    readonly logId!: string;

    @Field(() => String)
    @Column('text')
    readonly message!: string;

    @Field(() => String)
    @Column('varchar')
    readonly class!: string;

    @Field(() => String)
    @Column('varchar')
    readonly method!: string;

    @Field(() => Date)
    @CreateDateColumn()
    readonly createdAt!: string;
}
