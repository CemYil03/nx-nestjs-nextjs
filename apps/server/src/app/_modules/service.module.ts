import { Module, Provider } from '@nestjs/common';
import { LogService } from '../log/service/log.service';
import { RepositoryModule } from './repository.module';
import { SessionService } from '../session/service/session.service';
import { UserService } from '../user/service/user.service';
import { EmailTemplateService } from '../_shared-services/email-template/email-template.service';
import { EmailService } from '../_shared-services/email/email.service';
import { IdentifierService } from '../_shared-services/identifier/identifier.service';
import { IdentityProviderService } from '../_shared-services/identity-provider/identity-provider.service';
import { ImageService } from '../_shared-services/image/image.service';
import { PushNotificationService } from '../_shared-services/push-notification/push-notification.service';
import { SmsService } from '../_shared-services/sms/sms.service';
import { SubscriptionService } from '../_shared-services/subscription/subscription.service';

const sharedServices: Provider[] = [
    EmailService,
    EmailTemplateService,
    IdentifierService,
    IdentityProviderService,
    ImageService,
    PushNotificationService,
    SmsService,
    SubscriptionService,
];

@Module({
    imports: [RepositoryModule],
    providers: [...sharedServices, UserService, SessionService, LogService],
    exports: [],
})
export class ServiceModule {}
