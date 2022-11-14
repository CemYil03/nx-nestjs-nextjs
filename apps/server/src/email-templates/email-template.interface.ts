export interface EmailTemplate {
    templatePath: string;
    partials: EmailTemplate[];
    staticLocalizedKeys: string[];
    variables: any;
}
