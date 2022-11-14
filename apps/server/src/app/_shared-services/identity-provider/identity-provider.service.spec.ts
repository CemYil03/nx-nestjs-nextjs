import { Test, TestingModule } from '@nestjs/testing';
import { IdentityProviderService } from './identity-provider.service';

describe('IdentityProviderService', () => {
    let service: IdentityProviderService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [IdentityProviderService],
        }).compile();

        service = module.get<IdentityProviderService>(IdentityProviderService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
