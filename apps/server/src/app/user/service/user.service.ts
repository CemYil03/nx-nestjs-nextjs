import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogService } from '../../log/service/log.service';
import { FindManyUsersRequest } from '../dtos/find-many-users.request';
import { User } from '../user.model';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly users: Repository<User>, private readonly logService: LogService) {}

    async findMany(reqeust: FindManyUsersRequest): Promise<User[]> {
        try {
            const users: User[] = await this.users.find();
            return users;
        } catch (error) {
            await this.logService.createOne(error, UserService.name, UserService.prototype.findMany.name);
            return [];
        }
    }

    async findOne(userId: string): Promise<User | null> {
        try {
            const user: User | null = await this.users.findOne({ where: { userId: userId } });
            return user;
        } catch (error) {
            await this.logService.createOne(error, UserService.name, UserService.prototype.findOne.name);
            return null;
        }
    }
}
