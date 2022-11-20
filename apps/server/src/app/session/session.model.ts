import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity('Sessions')
export class Session {
    // constructor(session: Session) {
    //     this.sessionId = session.sessionId;
    //     this.lastUpdatedAt = session.lastUpdatedAt;
    //     this.createdAt = session.createdAt;
    // }

    @Field(() => String)
    @PrimaryColumn('char', { length: 20 })
    readonly sessionId!: string;

    @Field(() => Date)
    @CreateDateColumn()
    readonly lastUpdatedAt!: Date;

    @Field(() => Date)
    @CreateDateColumn()
    readonly createdAt!: Date;
}
