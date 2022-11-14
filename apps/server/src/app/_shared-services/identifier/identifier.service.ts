import { Injectable } from '@nestjs/common';
import { customAlphabet } from 'nanoid';
import { v4, v5 } from 'uuid';

@Injectable()
export class IdentifierService {
    private readonly nanoIdGenerator: () => string = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 20);

    generateNanoId(): string {
        return this.nanoIdGenerator();
    }

    generateUuidV4(): string {
        return v4();
    }

    generateUuidV5(value: string): string {
        return v5(value, value);
    }
}
