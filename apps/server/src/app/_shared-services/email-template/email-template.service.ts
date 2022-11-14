import { Injectable } from '@nestjs/common';
import { EmailTemplate } from '../../../email-templates/email-template.interface';

@Injectable()
export class EmailTemplateService {
    render(template: EmailTemplate): string | null {
        try {
            // template.partials.forEach()
            return '';
        } catch (error) {
            return null;
        }
    }
}

// console.log(render('<p>{{name}}</p>', { name: 'Maximilian Mustermann' }))
// console.log(render('{{#participants}}<p>{{.}}</p>{{/participants}}', { participants: ['Alice', 'Bob', 'Charlie'] }))
// console.log(
//     render(
//         readFileSync(join(process.cwd(), 'apps/server/src/email-templates/forgot-password.html')).toString(),
//         { content: 'hello world!' },
//         {
//             header: readFileSync(join(process.cwd(), 'apps/server/src/email-templates/partials/header.html')).toString(),
//             footer: readFileSync(join(process.cwd(), 'apps/server/src/email-templates/partials/footer.html')).toString(),
//         },
//     ),
// );
