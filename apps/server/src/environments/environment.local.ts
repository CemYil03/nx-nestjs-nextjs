import { Environment } from './environment.interface';

export const environment: Environment = {
    type: 'local',
    webUrl: 'http://127.0.0.1:4200',
    graphqlUrl: 'http://127.0.0.1:3333/graphql',
    filesUrl: 'http://127.0.0.1:3333',
};
