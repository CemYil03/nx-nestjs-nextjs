import { join } from 'path';
import { EmailTemplate } from '../email-template.interface';

export class ForgotPasswordTemplate implements EmailTemplate {
    staticLocalizedKeys: string[] = [];
    variables: any;
    templatePath: string = join(process.cwd(), 'apps/server/src/email-templates/forgot-password/forgot-password.html');
    partials: EmailTemplate[] = [];
}
