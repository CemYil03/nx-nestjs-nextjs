export interface Environment {
    type: 'local' | 'staging' | 'production';
    webUrl: string;
    graphqlUrl: string;
    filesUrl: string;
}
