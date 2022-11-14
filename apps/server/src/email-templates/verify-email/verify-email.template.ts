import { join } from 'path';
import { EmailTemplate } from '../email-template.interface';

export class VerifyEmailTemplate implements EmailTemplate {
    templatePath: string = join(process.cwd(), 'apps/server/src/email-templates/verify-email/verify-email.html');
    partials: EmailTemplate[] = [];
    staticLocalizedKeys: string[] = [];
    variables: { name: string };

    constructor(name: string) {
        this.variables = { name: name };
    }
}
